import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditClinicService} from "../../services/apiClinicServices.js";


export function useCreateClinicService() {
    const queryClient = useQueryClient();

    const {mutate: createClinicService, isPending: isCreating} = useMutation({
        mutationFn: createEditClinicService,
        onSuccess: () => {
            toast.success("New clinic service successfully created");
            queryClient.invalidateQueries({
                queryKey: ['clinicServices'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createClinicService}
}
