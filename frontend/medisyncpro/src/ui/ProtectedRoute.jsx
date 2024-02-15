import {useGetToken} from "../services/useGetToken.js";
import styled from "styled-components";
import Spinner from "./Spinner.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useGetRole} from "../services/useGetRole.js";
import AccessDenied from "./AccessDenied.jsx";

const FullPage = styled.div`
height: 100lvh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

const ProtectedRoute = ({
                            children,
                            adminOnly,
                            ownerOnly,
                            receptionistOnly = false,
                            doctorOnly = false,
                            patientOnly = false
                        }) => {
    const {goToLogin, isLoading, token} = useGetToken();
    const navigate = useNavigate();

    const {roles, isLoading: isLoadingRole} = useGetRole();

    useEffect(() => {
        if (goToLogin) {
            navigate("/login");
        }
    }, [goToLogin, navigate]);

    if (isLoading || isLoadingRole) {
        return <FullPage><Spinner/></FullPage>;
    }

    const hasAdminRole = roles === "ROLE_ADMIN";
    const hasPatientRole = roles === "ROLE_PATIENT";
    const hasOwnerRole = roles === "ROLE_OWNER";
    const hasReceptionistRole = roles === "ROLE_RECEPTIONIST";
    const hasDoctorRole = roles === "ROLE_DOCTOR"

    if (adminOnly && hasAdminRole) {
        return children;
    }
    if (ownerOnly && hasOwnerRole) {
        return children;
    }
    if (patientOnly && hasPatientRole) {
        return children;
    }
    if (receptionistOnly && hasReceptionistRole) {
        return children;
    }
    if (doctorOnly && hasDoctorRole) {
        return children;
    }

    return <FullPage><AccessDenied/></FullPage>;


};

export default ProtectedRoute;