import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditClinic} from "../../services/apiClinics.js";

export function useEditClinic() {
    const queryClient = useQueryClient();

    const {mutate: editClinic, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createEditClinic(newData, id),
        onSuccess: () => {
            toast.success("Clinic successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['clinics','clinicAuth','clinic'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isEditing, editClinic}
}