import {useQuery} from "@tanstack/react-query";
import {getClinics} from "../../services/apiClinics.js";

export function useClinics(){
    const {data:clinics,isLoading} = useQuery({
        queryFn: getClinics,
        queryKey: ["clinics"]
    })

    return {clinics,isLoading};
}