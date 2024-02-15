import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {addSpecializationToClinic} from "../../services/apiSpecializations.js";

export function useAddSpecializationToClinic() {
    const queryClient = useQueryClient();

    const {mutate: addSpecialization, isPending: isCreating} = useMutation({
        mutationFn: addSpecializationToClinic,
        onSuccess: () => {
            toast.success(`Specialization successfully added to clinic`);
            queryClient.invalidateQueries({
                queryKey: ['specializationtByClinic'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, addSpecialization}
}
