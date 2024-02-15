import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getClinicServices} from "../../services/apiClinicServices.js";

export function useClinicServices() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page")) === 0 ? 1 : Number(searchParams.get("page"));
    const specializations = searchParams.get('specialization') || '';
    const sort = searchParams.get('sortBy') || '';


    const {data, isLoading} = useQuery({
        queryFn: () => getClinicServices({page, specializations, sort}),
        queryKey: ["clinicServices", page, specializations, sort]
    })

    const clinicServices = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / 15);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["clinicServices", page + 1, specializations, sort],
            queryFn: () => getClinicServices({page: page - 1, specializations, sort}),

        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["clinicServices", page - 1, specializations, sort],

            queryFn: () => getClinicServices({page: page - 1, specializations, sort}),

        });

    return {isLoading, clinicServices, totalElements}
}

