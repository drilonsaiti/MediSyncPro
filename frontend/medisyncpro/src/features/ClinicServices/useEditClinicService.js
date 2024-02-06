import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createEditClinicService} from "../../services/apiClinicServices.js";

export function useEditClinicService() {
    const queryClient = useQueryClient();

    const {mutate: editClinicService, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createEditClinicService(newData, id),
        onSuccess: () => {
            toast.success("Clinic service successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['clinicServices'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isEditing, editClinicService}
}