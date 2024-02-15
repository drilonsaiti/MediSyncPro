import {useQuery} from "@tanstack/react-query";
import {getAppointmentDates} from "../../services/apiAppointments.js";

export function useAppointmentDates(clinicId) {

    const {isLoading, data: dates} = useQuery({
        queryFn: () => getAppointmentDates(clinicId),
        queryKey: ["appointmentDates", clinicId],
    })

    return {isLoading, dates};
}