import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getClinicSchedules, getClinicSchedulesByDoctorId} from "../../services/apiClinicSchedules.js";

export function useClinicSchedules() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const sort = searchParams.get('sortBy') || '';


    const {data, isLoading} = useQuery({
        queryFn: () => getClinicSchedules({page, sort}),
        queryKey: ["clinicSchedule", page, sort]
    })

    const clinicSchedules = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / 15);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["clinicSchedule", page + 1, sort],
            queryFn: () => getClinicSchedules({page: page - 1, sort}),

        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["clinicSchedule", page - 1, sort],

            queryFn: () => getClinicSchedules({page: page - 1, sort}),

        });

    return {isLoading, clinicSchedules, totalElements}
}


export function useScheduleByDoctorId(doctorId) {
    const {data: scheduleByDoctor, isLoading: isLoadingScheduleByDoctor} = useQuery({
        queryFn: () => getClinicSchedulesByDoctorId(doctorId),
        queryKey: ["scheduleByDoctor", doctorId]
    })

    return {scheduleByDoctor, isLoadingScheduleByDoctor}
}