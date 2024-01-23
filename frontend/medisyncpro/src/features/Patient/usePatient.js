import {useQuery} from "@tanstack/react-query";
import {getPatients} from "../../services/apiPatients.js";
export function usePatients(){
    const {data:patients,isLoading} = useQuery({
        queryFn: getPatients,
        queryKey: ["patients"]
    })

    return {patients,isLoading};
}