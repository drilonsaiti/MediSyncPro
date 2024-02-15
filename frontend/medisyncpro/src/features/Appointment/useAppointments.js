import {useQuery, useQueryClient} from "@tanstack/react-query";
import {
    getAppointments,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    getMyAppointment
} from "../../services/apiAppointments.js";
import {useParams, useSearchParams} from "react-router-dom";

export function useAppointments() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const types = searchParams.get('types') ?? '';
    const nameOrEmail = searchParams.get('nameOrEmail') || '';

    const {data, isLoading} = useQuery({
        queryFn: () => getAppointments({page, nameOrEmail, types}),
        queryKey: ["appointments", page, nameOrEmail, types]
    })

    const appointments = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / 15);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["appointments", page + 1, nameOrEmail, types],
            queryFn: () => getAppointments({page: page - 1, nameOrEmail, types}),

        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["appointments", page - 1, nameOrEmail, types],

            queryFn: () => getAppointments({page: page - 1, nameOrEmail, types}),

        });

    return {isLoading, appointments, totalElements}
}

export function useMyAppointment() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));


    const {data, isLoading} = useQuery({
        queryFn: () => getMyAppointment({page}),
        queryKey: ["myAppointment", page]
    })

    const appointments = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / 15);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["myAppointment", page + 1],
            queryFn: () => getMyAppointment({page: page - 1,}),

        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["myAppointment", page - 1],

            queryFn: () => getMyAppointment({page: page - 1}),

        });

    return {isLoading, appointments, totalElements}
}

export function useAppointmentsByPatient(id) {
    const {data: appointments, isLoading, error} = useQuery({
        queryFn: () => getAppointmentsByPatient(id),
        queryKey: ["appointmentPatient", id],
        onSuccess: (data) => {
        },
    });

    if (error) {
        console.error("Error fetching appointments:", error);
    }

    return {appointments, isLoading, error};
}

export function useAppointmentsByDoctor() {
    const {doctorId} = useParams();
    const {data: appointments, isLoading} = useQuery({
        queryFn: () => getAppointmentsByDoctor(doctorId),
        queryKey: ["appointmentDoctor", doctorId]
    })

    return {appointments, isLoading};
}

