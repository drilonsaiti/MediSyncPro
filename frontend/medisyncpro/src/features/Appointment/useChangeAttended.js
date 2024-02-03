import {useMutation, useQueryClient} from "@tanstack/react-query";
import {changeAttended} from "../../services/apiAppointments.js";
import toast from "react-hot-toast";

export function useChangeAttended() {
    const queryClient = useQueryClient();

    const {mutate: attendedMutate, isPending: isCreating} = useMutation({
        mutationFn: changeAttended,
        onSuccess: (data) => {
            toast.success(`Appointment with id#${data.id} successfully changed`);
            queryClient.invalidateQueries({
                queryKey: ['appointments'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, attendedMutate}
}