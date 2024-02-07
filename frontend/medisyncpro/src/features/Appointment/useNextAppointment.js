import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getAppointmentsByDoctor, getAppointmentsByPatient, getNextAppointment} from "../../services/apiAppointments.js";
import toast from "react-hot-toast";

export function useNextAppointment(id) {
    const { data: nextAppointments, isLoading, error } = useQuery({
        queryFn: () => getNextAppointment(id),
        queryKey: ["nextAppointment", id],

    });

    return { nextAppointments, isLoading, error };
}