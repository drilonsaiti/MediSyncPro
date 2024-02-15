import {useFindByEmailOrContactNumber} from "./useFindByEmailOrContactNumber.js";

export function FindPatientByEmailOrPhone(emailOrPhone) {
    const { patient, isLoading } =  useFindByEmailOrContactNumber(emailOrPhone);

    if (!isLoading) {
        return patient;
    }
    // Handle loading state if needed
    return null;
}
