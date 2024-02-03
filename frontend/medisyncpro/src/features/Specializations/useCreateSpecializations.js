import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditSpecializations} from "../../services/apiSpecializations.js";


export function useCreateSpecializations() {
    const queryClient = useQueryClient();

    const {mutate: createSpecializations, isPending: isCreating} = useMutation({
        mutationFn: createEditSpecializations,
        onSuccess: () => {
            toast.success("New specializations successfully created");
            queryClient.invalidateQueries({
                queryKey: ['specializations'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createSpecializations}
}
