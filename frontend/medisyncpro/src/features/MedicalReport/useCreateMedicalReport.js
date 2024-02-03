import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditMedicalReport} from "../../services/apiMedicalReport.js";


export function useCreateMedicalReport() {
    const queryClient = useQueryClient();

    const {mutate: createMedicalReport, isPending: isCreating} = useMutation({
        mutationFn: createEditMedicalReport,
        onSuccess: () => {
            toast.success("New medical report successfully created");
            queryClient.invalidateQueries({
                queryKey: ['medicalReports'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createMedicalReport}
}
