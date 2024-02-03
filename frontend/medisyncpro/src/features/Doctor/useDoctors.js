import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getDoctorById, getDoctors} from "../../services/apiDoctors.js";
import {useParams, useSearchParams} from "react-router-dom";


export function useDoctors() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const specializations = searchParams.get('specialization') || '';
    const service = searchParams.get('service') || '';


    const {data, isLoading} = useQuery({
        queryFn: () => getDoctors({page, specializations, service}),
        queryKey: ["doctors", page, specializations, service]
    })

    const doctors = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / 15);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["doctors", page + 1, specializations, service],
            queryFn: () => getDoctors({page: page - 1, specializations, service}),

        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["doctors", page - 1, specializations, service],

            queryFn: () => getDoctors({page: page - 1, specializations, service}),

        });

    return {isLoading, doctors, totalElements}
}

export function useDoctorById() {
    const {doctorId} = useParams();
    const {data: doctor, isLoading} = useQuery({
        queryFn: () => getDoctorById(doctorId),
        queryKey: ["doctor", doctorId]
    })

    return {doctor, isLoading};
}