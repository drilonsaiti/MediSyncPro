import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deletePatient} from "../../services/apiPatients.js";

export function useDeletePatient() {

    const queryClient = useQueryClient();

    const {isPending: isDeleting, mutate: deleteMutate} = useMutation({
        mutationFn: deletePatient,
        onSuccess: () => {
            toast.success("Patient successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['patients'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting, deleteMutate}
}