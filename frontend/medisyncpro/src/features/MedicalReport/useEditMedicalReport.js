import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditMedicalReport} from "../../services/apiMedicalReport.js";

export function useEditMedicalReport() {
    const queryClient = useQueryClient();

    const {mutate: editMedicalReports, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createEditMedicalReport(newData, id),
        onSuccess: () => {
            toast.success("Medical report successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['medicalReports'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isEditing, editMedicalReports}
}