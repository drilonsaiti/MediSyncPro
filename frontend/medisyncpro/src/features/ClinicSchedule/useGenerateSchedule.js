import {useMutation, useQueryClient} from "@tanstack/react-query";
import {generateSchedules} from "../../services/apiClinicSchedules.js";
import toast from "react-hot-toast";

export function useGenerateSchedule() {
    const queryClient = useQueryClient();

    const {mutate: generateSchedule, isPending: isCreating} = useMutation({
        mutationFn: generateSchedules,
        onSuccess: () => {
            toast.success("New schedules successfully generated");
            queryClient.invalidateQueries({
                queryKey: ['clinicSchedule'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, generateSchedule}
}