import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteDoctor} from "../../services/apiDoctors.js";

export function useDeleteDoctor() {

    const queryClient = useQueryClient();

    const {isPending: isDeleting, mutate: deleteMutate} = useMutation({
        mutationFn: deleteDoctor,
        onSuccess: () => {
            toast.success("Doctor successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['doctors', 'doctorsClinic'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting, deleteMutate}
}