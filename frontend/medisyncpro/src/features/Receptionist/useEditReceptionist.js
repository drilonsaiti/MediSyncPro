import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditReceptionist} from "../../services/apiReceptionist.js";

export function useEditReceptionist() {
    const queryClient = useQueryClient();

    const {mutate: editReceptionist, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createEditReceptionist(newData, id),
        onSuccess: () => {
            toast.success("Receptionist successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['receptionist','profile'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isEditing, editReceptionist}
}