import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteDoctorFromClinic} from "../../services/apiDoctors.js";

export function useDeleteDoctorFromClinic() {

    const queryClient = useQueryClient();

    const {isPending: isDeleting, mutate: deleteMutate} = useMutation({
        mutationFn: ({doctorId, clinicId}) => deleteDoctorFromClinic(doctorId, clinicId),
        onSuccess: () => {
            toast.success("Doctor successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['doctors'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting, deleteMutate}
}