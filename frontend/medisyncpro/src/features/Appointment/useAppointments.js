import {useQuery} from "@tanstack/react-query";
import {getAppointments, getAppointmentsByPatient} from "../../services/apiAppointments.js";

export function useAppointments(){
    const {data:appointments,isLoading} = useQuery({
        queryFn: getAppointments,
        queryKey: ["appointments"]
    })

    return {appointments,isLoading};
}

export function useAppointmentsByPatient(id){
    const {data:appointments,isLoading} = useQuery({
        queryFn: () => getAppointmentsByPatient(id),
        queryKey: ["appointment",id]
    })

    return {appointments,isLoading};
}