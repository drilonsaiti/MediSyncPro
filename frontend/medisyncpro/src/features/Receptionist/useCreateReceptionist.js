import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditReceptionist} from "../../services/apiReceptionist.js";


export function useCreateReceptionist() {
    const queryClient = useQueryClient();

    const {mutate: createReceptionist, isPending: isCreating} = useMutation({
        mutationFn: createEditReceptionist,
        onSuccess: () => {
            toast.success("New receptionists successfully created");
            queryClient.invalidateQueries({
                queryKey: ['receptionists'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createReceptionist}
}
