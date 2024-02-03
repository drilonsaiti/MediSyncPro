import {useQuery} from "@tanstack/react-query";
import {getReceptionist, getReceptionistById} from "../../services/apiReceptionist.js";
import {useParams} from "react-router-dom";

export function useReceptionist() {
    const {data: receptionist, isLoading} = useQuery({
        queryFn: getReceptionist,
        queryKey: ["receptionist"]
    })

    return {receptionist, isLoading};
}

export function useReceptionistById() {
    const {receptionistId} = useParams();
    console.log(receptionistId);
    const {data: receptionist, isLoading} = useQuery({
        queryFn: () => getReceptionistById(receptionistId),
        queryKey: ["receptionist", receptionistId]
    })

    return {receptionist, isLoading};
}