import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getClinicById, getClinics, getClinicServiceBy} from "../../services/apiClinics.js";
import {useParams, useSearchParams} from "react-router-dom";

export function useClinics() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const specializations = searchParams.get('specialization') || '';
    const service = searchParams.get('service') || '';
    const byDate = searchParams.get('byDate') || '';


    const {data, isLoading} = useQuery({
        queryFn: () => getClinics({page, specializations, service, byDate}),
        queryKey: ["clinics", page, specializations, service, byDate]
    })

    const clinics = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / 15);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["clinics", page + 1, specializations, service, byDate],
            queryFn: () => getClinics({page: page - 1, specializations, service, byDate}),

        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["clinics", page - 1, specializations, service, byDate],

            queryFn: () => getClinics({page: page - 1, specializations, service, byDate}),

        });

    return {isLoading, clinics, totalElements}
}

export function useClinicById() {
    const {clinicId} = useParams();
    const {data: clinic, isLoading} = useQuery({
        queryFn: () => getClinicById(clinicId),
        queryKey: ["clinic", clinicId]
    })

    return {clinic, isLoading};
}


export function useClinicServicesById(clinicId) {
    const {data: clinicServices, isLoading} = useQuery({
        queryFn: () => getClinicServiceBy(clinicId),
        queryKey: ["clinicServicesByClinic", clinicId]
    })

    return {clinicServices, isLoading};
}