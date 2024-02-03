import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditDoctor} from "../../services/apiDoctors.js";

export function useEditDoctor() {
    const queryClient = useQueryClient();

    const {mutate: editDoctor, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createEditDoctor(newData, id),
        onSuccess: () => {
            toast.success("Doctor successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['doctors'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isEditing, editDoctor}
}