import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteClinicSchedule} from "../../services/apiClinicSchedules.js";

export function useDeleteClinicSchedule() {

    const queryClient = useQueryClient();

    const {isPending: isDeleting, mutate: deleteMutate} = useMutation({
        mutationFn: deleteClinicSchedule,
        onSuccess: () => {
            toast.success("Clinic schedule successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['clinicSchedule'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting, deleteMutate}
}