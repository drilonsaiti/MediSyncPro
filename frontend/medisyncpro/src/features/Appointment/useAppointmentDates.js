import {useQuery} from "@tanstack/react-query";
import {getAppointmentDates} from "../../services/apiAppointments.js";

export function useAppointmentDates(){

    const {isLoading,data:dates} = useQuery({
        queryFn: getAppointmentDates,
        queryKey:  ["appointmentDates",],
    })

    return {isLoading,dates};
}