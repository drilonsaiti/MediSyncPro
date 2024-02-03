import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteAppointment} from "../../services/apiAppointments.js";

export function useDeleteAppointment() {

    const queryClient = useQueryClient();

    const {isPending: isDeleting, mutate: deleteMutate} = useMutation({
        mutationFn: deleteAppointment,
        onSuccess: () => {
            toast.success("Appointment successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['appointments'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting, deleteMutate}
}