import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {addReceptionistToClinic} from "../../services/apiReceptionist.js";

export function useAddReceptionistToClinic() {
    const queryClient = useQueryClient();

    const {mutate: addReceptionist, isPending: isCreating} = useMutation({
        mutationFn: addReceptionistToClinic,
        onSuccess: () => {
            toast.success(`Receptionist successfully added to clinic`);
            queryClient.invalidateQueries({
                queryKey: ['receptionistByClinic', 'receptionist'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, addReceptionist}
}
