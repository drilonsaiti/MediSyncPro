import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createAppointmentByReceptionist, createEditAppointment} from "../../services/apiAppointments.js";


export function useCreateAppointment() {
    const queryClient = useQueryClient();

    const {mutate: createAppointment, isPending: isCreating} = useMutation({
        mutationFn: createEditAppointment,
        onSuccess: () => {
            toast.success("New appointment successfully created");
            queryClient.invalidateQueries({
                queryKey: ['appointments'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createAppointment}
}


export function useCreateAppointmentByReceptionist() {
    const queryClient = useQueryClient();

    const {mutate: createAppointmentByRecep, isPending: isCreating} = useMutation({
        mutationFn: createAppointmentByReceptionist,
        onSuccess: () => {
            toast.success("New appointment successfully created");
            queryClient.invalidateQueries({
                queryKey: ['appointments'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createAppointmentByRecep}
}
