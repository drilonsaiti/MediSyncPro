import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditPatient} from "../../services/apiPatients.js";


export function useCreateAppointment() {
    const queryClient = useQueryClient();

    const {mutate:createPatient,isPending:isCreating} = useMutation({
        mutationFn: createEditPatient,
        onSuccess: () => {
            toast.success("New patient successfully created");
            queryClient.invalidateQueries({
                queryKey: ['appointments'],
            });
        },
        onError:(err) => toast.error(err.message)
    });

    return {isCreating,createPatient}
}
