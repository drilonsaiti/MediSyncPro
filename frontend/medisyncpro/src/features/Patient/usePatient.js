import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getPatientById, getPatientForProfile, getPatients} from "../../services/apiPatients.js";
import {useParams, useSearchParams} from "react-router-dom";

export function usePatients() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const nameOrEmail = searchParams.get('nameOrEmail') || '';


    const {data, isLoading} = useQuery({
        queryFn: () => getPatients({page, nameOrEmail}),
        queryKey: ["patients", page, nameOrEmail]
    })

    const patients = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / 15);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["patients", page + 1, nameOrEmail],
            queryFn: () => getPatients({page: page - 1, nameOrEmail}),

        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["patients", page - 1, nameOrEmail],

            queryFn: () => getPatients({page: page - 1, nameOrEmail}),

        });

    return {isLoading, patients, totalElements}
}

export function usePatientById() {
    const {patientId} = useParams();
    const {data: patient, isLoading} = useQuery({
        queryFn: () => getPatientById(patientId),
        queryKey: ["patient", patientId]
    })

    return {patient, isLoading};
}


export function usePatientForProfile() {
    const {data: patient, isLoading} = useQuery({
        queryFn: getPatientForProfile,
        queryKey: ["profilePatient"]
    })

    return {patient, isLoading};
}