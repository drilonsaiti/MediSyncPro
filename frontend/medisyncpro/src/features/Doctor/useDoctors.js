import {useQuery} from "@tanstack/react-query";
import {getDoctors} from "../../services/apiDoctors.js";

export function useDoctors(){
    const {data:doctors,isLoading} = useQuery({
        queryFn: getDoctors,
        queryKey: ["doctors"]
    })

    return {doctors,isLoading};
}