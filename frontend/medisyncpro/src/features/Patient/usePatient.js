import {useQuery} from "@tanstack/react-query";
import {getPatientById, getPatients} from "../../services/apiPatients.js";
import {useParams} from "react-router-dom";

export function usePatients(){
    const {data:patients,isLoading} = useQuery({
        queryFn: getPatients,
        queryKey: ["patients"]
    })

    return {patients,isLoading};
}

export function usePatientById(){
    const { patientId } = useParams();
    const {data:patient,isLoading} = useQuery({
        queryFn: () => getPatientById(patientId),
        queryKey: ["patient",patientId]
    })

    return {patient,isLoading};
}