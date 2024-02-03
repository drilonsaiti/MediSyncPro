import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getAppointments, getAppointmentsByDoctor, getAppointmentsByPatient} from "../../services/apiAppointments.js";
import {useParams, useSearchParams} from "react-router-dom";

export function useAppointments() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const nameOrEmail = searchParams.get('nameOrEmail') || '';

    const {data, isLoading} = useQuery({
        queryFn: () => getAppointments({page, nameOrEmail}),
        queryKey: ["appointments", page, nameOrEmail]
    })

    const appointments = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / 15);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["appointments", page + 1, nameOrEmail],
            queryFn: () => getAppointments({page: page - 1, nameOrEmail}),

        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["appointments", page - 1, nameOrEmail],

            queryFn: () => getAppointments({page: page - 1, nameOrEmail}),

        });

    return {isLoading, appointments, totalElements}
}

export function useAppointmentsByPatient(id) {
    const {data: appointments, isLoading} = useQuery({
        queryFn: () => getAppointmentsByPatient(id),
        queryKey: ["appointmentPatient", id]
    })

    return {appointments, isLoading};
}

export function useAppointmentsByDoctor() {
    const {doctorId} = useParams();
    const {data: appointments, isLoading} = useQuery({
        queryFn: () => getAppointmentsByDoctor(doctorId),
        queryKey: ["appointmentDoctor", doctorId]
    })

    return {appointments, isLoading};
}

