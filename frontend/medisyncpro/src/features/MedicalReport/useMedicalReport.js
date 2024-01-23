import {useQuery} from "@tanstack/react-query";
import {getMedicalReports} from "../../services/apiMedicalReport.js";
export function useMedicalReports(){
    const {data:medicalReports,isLoading} = useQuery({
        queryFn: getMedicalReports,
        queryKey: ["patient"]
    })

    return {medicalReports,isLoading};
}