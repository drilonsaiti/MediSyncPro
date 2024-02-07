import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditDoctor} from "../../services/apiDoctors.js";


export function useCreateDoctor() {
    const queryClient = useQueryClient();

    const {mutate: createDoctor, isPending: isCreating} = useMutation({
        mutationFn: createEditDoctor,
        onSuccess: () => {
            toast.success("New doctor successfully created");
            queryClient.invalidateQueries({
                queryKey: ['doctors'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createDoctor}
}
