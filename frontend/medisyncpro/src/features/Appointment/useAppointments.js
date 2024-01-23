import {useQuery} from "@tanstack/react-query";
import {getAppointments} from "../../services/apiAppointments.js";
export function useAppointments(){
    const {data:appointments,isLoading} = useQuery({
        queryFn: getAppointments,
        queryKey: ["appointments"]
    })

    return {appointments,isLoading};
}