import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteSpecializations} from "../../services/apiSpecializations.js";

export function useDeleteSpecializations() {

    const queryClient = useQueryClient();

    const {isPending: isDeleting, mutate: deleteMutate} = useMutation({
        mutationFn: deleteSpecializations,
        onSuccess: () => {
            toast.success("Specializations successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['specializations'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting, deleteMutate}
}