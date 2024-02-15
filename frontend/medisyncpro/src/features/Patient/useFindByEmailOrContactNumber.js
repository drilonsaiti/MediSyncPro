import {useQuery} from "@tanstack/react-query";
import {findByEmailOrContactNumber, getPatientForProfile} from "../../services/apiPatients.js";

export function useFindByEmailOrContactNumber(emailOrPhoneNumber) {
    const {data: patient, isLoading} = useQuery({
        queryFn:() => findByEmailOrContactNumber(emailOrPhoneNumber),
        queryKey: ["patient",emailOrPhoneNumber]
    })

    return {patient, isLoading};
}