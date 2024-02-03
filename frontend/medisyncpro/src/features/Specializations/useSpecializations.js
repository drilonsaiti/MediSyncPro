import {useQuery} from "@tanstack/react-query";
import {getSpecializations} from "../../services/apiSpecializations.js";

export function useSpecializations() {
    const {data: specializations, isLoading} = useQuery({
        queryFn: getSpecializations,
        queryKey: ["specializations"]
    })

    return {specializations, isLoading};
}