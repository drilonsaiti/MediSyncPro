import React from 'react';
import {useGetRole} from "../services/useGetRole.js";
import PatientDetailsProfile from "../features/Patient/PatientDetailsProfile.jsx";
import Spinner from "../ui/Spinner.jsx";
import ClinicProfileDetails from "../features/Clinic/ClinicProfileDetails.jsx";

const Profile = () => {
    const {roles, isLoading: isLoadingRole} = useGetRole();

    if (isLoadingRole) return <Spinner/>
    let profile;

    if (roles.includes("OWNER")) {
        profile = <ClinicProfileDetails/>
    }
    if (roles.includes("PATIENT")) {
        profile = <PatientDetailsProfile/>
    }
    return profile;
};

export default Profile;