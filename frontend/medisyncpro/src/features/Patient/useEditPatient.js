import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditPatient} from "../../services/apiPatients.js";

export function useEditPatient() {
    const queryClient = useQueryClient();

    const {mutate: editPatient, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createEditPatient(newData, id),
        onSuccess: () => {
            toast.success("Patient successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['patients'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isEditing, editPatient}
}