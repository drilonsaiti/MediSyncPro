import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addDoctorToClinic} from "../../services/apiDoctors.js";
import toast from "react-hot-toast";

export function useAddDoctorToClinic() {
    const queryClient = useQueryClient();

    const {mutate: addDoctor, isPending: isCreating} = useMutation({
        mutationFn: addDoctorToClinic,
        onSuccess: (data) => {
            toast.success(`Doctor successfully added to clinic`);
            queryClient.invalidateQueries({
                queryKey: ['doctorsClinic'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, addDoctor}
}
