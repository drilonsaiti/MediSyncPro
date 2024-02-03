import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditClinicSchedule} from "../../services/apiClinicSchedules.js";

export function useEditClinicSchedule() {
    const queryClient = useQueryClient();

    const {mutate: editClinicSchedule, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createEditClinicSchedule(newData, id),
        onSuccess: () => {
            toast.success("Clinic schedule successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['clinicSchedule'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isEditing, editClinicSchedule}
}