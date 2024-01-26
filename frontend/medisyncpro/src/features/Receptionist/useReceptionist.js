import {useQuery} from "@tanstack/react-query";
import {getReceptionist} from "../../services/apiReceptionist.js";

export function useReceptionist(){
    const {data:receptionist,isLoading} = useQuery({
        queryFn: getReceptionist,
        queryKey: ["receptionist"]
    })

    return {receptionist,isLoading};
}