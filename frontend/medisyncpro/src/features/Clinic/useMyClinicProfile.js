import {useQuery} from "@tanstack/react-query";
import {getMyClinicProfile} from "../../services/apiClinics.js";

export function useMyClinicProfile() {
    const {data: clinic, isLoading} = useQuery({
        queryFn: getMyClinicProfile,
        queryKey: ["clinicProfile"]
    })

    return {clinic, isLoading};
}