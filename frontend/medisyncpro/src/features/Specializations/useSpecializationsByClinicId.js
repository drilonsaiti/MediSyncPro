import {useQuery} from "@tanstack/react-query";
import {getReceptionistByClinicId} from "../../services/apiReceptionist.js";
import {getSpecializationByClinicId} from "../../services/apiSpecializations.js";

export function useSpecializationsByClinicId() {
    const {data: specializationData, isLoading} = useQuery({
        queryFn: getSpecializationByClinicId,
        queryKey: ["specializationByClinic"]
    })

    return {specializationData, isLoading};
}
