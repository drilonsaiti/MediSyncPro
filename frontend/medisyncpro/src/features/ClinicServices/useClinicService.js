import {useQuery} from "@tanstack/react-query";
import {getClinicServices} from "../../services/apiClinicServices.js";
export function useClinicServices(){
    const {data:clinicServices,isLoading} = useQuery({
        queryFn: getClinicServices,
        queryKey: ["clinicServices"]
    })

    return {clinicServices,isLoading};
}