import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getMedicalReportById, getMedicalReports, getMyMedicalReports} from "../../services/apiMedicalReport.js";
import {useParams, useSearchParams} from "react-router-dom";

export function useMedicalReports() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const nameOrEmail = searchParams.get('nameOrEmail') || '';
    const byDate = searchParams.get('byDate') || '';


    const {data, isLoading} = useQuery({
        queryFn: () => getMedicalReports({page, nameOrEmail, byDate}),
        queryKey: ["medicalReport", page, nameOrEmail, byDate]
    })

    const medicalReports = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / 15);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["medicalReport", page + 1, nameOrEmail, byDate],
            queryFn: () => getMedicalReports({page: page - 1, nameOrEmail, byDate}),

        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["medicalReport", page - 1, nameOrEmail, byDate],

            queryFn: () => getMedicalReports({page: page - 1, nameOrEmail, byDate}),

        });

    return {isLoading, medicalReports, totalElements}
}

export function useMyMedicalReports() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));


    const {data, isLoading} = useQuery({
        queryFn: () => getMyMedicalReports({page}),
        queryKey: ["myMedicalReport", page]
    })

    const medicalReports = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / 15);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["myMedicalReport", page + 1],
            queryFn: () => getMyMedicalReports({page: page - 1,}),

        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["myMedicalReport", page - 1],

            queryFn: () => getMyMedicalReports({page: page - 1}),

        });

    return {isLoading, medicalReports, totalElements}
}

export function useGetMedicalReportById() {
    const {reportId} = useParams();
    const {data, isLoading} = useQuery({
        queryFn: () => getMedicalReportById(reportId),
        queryKey: ["medicalReport"]
    })

    return {data, isLoading};
}

export function useGetMedicalReportByReportId(reportId) {
    const {data, isLoading} = useQuery({
        queryFn: () => getMedicalReportById(reportId),
        queryKey: ["medicalReport", reportId]
    })

    return {data, isLoading};
}