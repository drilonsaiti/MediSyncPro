import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditAppointment} from "../../services/apiAppointments.js";

export function useEditAppointment() {
    const queryClient = useQueryClient();

    const {mutate: editAppointment, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createEditAppointment(newData, id),
        onSuccess: () => {
            toast.success("Appointment successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['appointments'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isEditing, editAppointment}
}