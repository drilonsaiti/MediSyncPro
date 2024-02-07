import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditClinic} from "../../services/apiClinics.js";


export function useCreateClinic() {
    const queryClient = useQueryClient();

    const {mutate: createClinic, isPending: isCreating} = useMutation({
        mutationFn: createEditClinic,
        onSuccess: () => {
            toast.success("New clinic successfully created");
            queryClient.invalidateQueries({
                queryKey: ['patients'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createClinic}
}
