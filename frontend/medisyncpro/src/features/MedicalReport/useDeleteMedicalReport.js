import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteMedicalReport} from "../../services/apiMedicalReport.js";

export function useDeleteMedicalReport() {

    const queryClient = useQueryClient();

    const {isPending: isDeleting, mutate: deleteMutate} = useMutation({
        mutationFn: deleteMedicalReport,
        onSuccess: () => {
            toast.success("Medical report successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['medicalReports'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting, deleteMutate}
}