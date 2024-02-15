import {useQuery} from "@tanstack/react-query";
import {getNextAppointment} from "../../services/apiAppointments.js";

export function useNextAppointment(id) {
    const {data: nextAppointments, isLoading, error} = useQuery({
        queryFn: () => getNextAppointment(id),
        queryKey: ["nextAppointment", id],

    });

    return {nextAppointments, isLoading, error};
}