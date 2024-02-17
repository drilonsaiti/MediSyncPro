import {useQuery} from "@tanstack/react-query";
import {
    getReceptionist,
    getReceptionistByClinicId,
    getReceptionistById, getReceptionistForProfile,
    getReceptionistSearch
} from "../../services/apiReceptionist.js";
import {useParams} from "react-router-dom";
import {getPatientForProfile} from "../../services/apiPatients.js";

export function useReceptionist() {
    const {data: receptionist, isLoading} = useQuery({
        queryFn: getReceptionist,
        queryKey: ["receptionist"]
    })

    return {receptionist, isLoading};
}

export function useReceptionistByClinicId() {
    const {data: receptionists, isLoading} = useQuery({
        queryFn: getReceptionistByClinicId,
        queryKey: ["receptionistByClinic"]
    })

    return {receptionists, isLoading};
}

export function useReceptionistById() {
    const {receptionistId} = useParams();
    const {data: receptionist, isLoading} = useQuery({
        queryFn: () => getReceptionistById(receptionistId),
        queryKey: ["receptionist", receptionistId]
    })

    return {receptionist, isLoading};
}

export function useReceptionistSearch() {
    const {data: receptionistsOptions, isLoading} = useQuery({
        queryFn: getReceptionistSearch,
        queryKey: ["receptionistsSearch"]
    })

    return {receptionistsOptions, isLoading};
}

export function useReceptionistForProfile() {
    const {data: receptionist, isLoading} = useQuery({
        queryFn: getReceptionistForProfile,
        queryKey: ["profileReceptionist"]
    })

    return {receptionist, isLoading};
}