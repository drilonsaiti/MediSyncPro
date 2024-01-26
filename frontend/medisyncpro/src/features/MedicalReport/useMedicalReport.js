import {useQuery} from "@tanstack/react-query";
import {getMedicalReportById, getMedicalReports} from "../../services/apiMedicalReport.js";
import {useParams} from "react-router-dom";

export function useMedicalReports(){
    const {data:medicalReports,isLoading} = useQuery({
        queryFn: getMedicalReports,
        queryKey: ["medicalReport"]
    })

    return {medicalReports,isLoading};
}

export function useGetMedicalReportById(){
    const { reportId } = useParams();
    const {data,isLoading} = useQuery({
        queryFn: () => getMedicalReportById(reportId),
        queryKey: ["medicalReport"]
    })

    return {data,isLoading};
}