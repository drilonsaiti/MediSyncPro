import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteReceptionistFromClinic} from "../../services/apiReceptionist.js";

export function useDeleteReceptionistFromClinic() {

    const queryClient = useQueryClient();

    const {isPending: isDeleting, mutate: deleteMutate} = useMutation({
        mutationFn: deleteReceptionistFromClinic,
        onSuccess: () => {
            toast.success("Receptionists successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['receptionists'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting, deleteMutate}
}