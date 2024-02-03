import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditClinicSchedule} from "../../services/apiClinicSchedules.js";


export function useCreateClinicSchedule() {
    const queryClient = useQueryClient();

    const {mutate: createClinicSchedule, isPending: isCreating} = useMutation({
        mutationFn: createEditClinicSchedule,
        onSuccess: () => {
            toast.success("New clinic schedule successfully created");
            queryClient.invalidateQueries({
                queryKey: ['clinicSchedule'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createClinicSchedule}
}
