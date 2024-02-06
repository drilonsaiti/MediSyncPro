import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteClinicService} from "../../services/apiClinicServices.js";

export function useDeleteClinicService() {

    const queryClient = useQueryClient();

    const {isPending: isDeleting, mutate: deleteMutate} = useMutation({
        mutationFn: deleteClinicService,
        onSuccess: () => {
            toast.success("Clinic service successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['clinicServices'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting, deleteMutate}
}