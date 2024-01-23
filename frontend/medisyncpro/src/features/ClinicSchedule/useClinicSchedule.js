import {useQuery} from "@tanstack/react-query";
import {getClinicSchedules} from "../../services/apiClinicSchedules.js";
export function useClinicSchedules(){
    const {data:clinicSchedules,isLoading} = useQuery({
        queryFn: getClinicSchedules,
        queryKey: ["clinicSchedule"]
    })

    return {clinicSchedules,isLoading};
}