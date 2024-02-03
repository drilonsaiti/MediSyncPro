import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditSpecializations} from "../../services/apiSpecializations.js";

export function useEditSpecializations() {
    const queryClient = useQueryClient();

    const {mutate: editSpecializations, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createEditSpecializations(newData, id),
        onSuccess: () => {
            toast.success("Specializations successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['specializations'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isEditing, editSpecializations}
}