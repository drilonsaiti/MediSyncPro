import React from 'react';
import Row from "../ui/Row.jsx";
import UpdateSettingsForm from "../features/Settings/UpdateSettingsForm.jsx";
import AccountDoctorSettings from "../features/Settings/AccountDoctorSettings.jsx";
import AccountReceptionistSettings from "../features/Settings/AccountReceptionistSettings.jsx";
import GenerateSchedule from "../features/ClinicSchedule/GenerateSchedule.jsx";
import AccountSpecializationSettings from "../features/Settings/AccountSpecializationSettings.jsx";
import CreateClinicForm from "../features/Clinic/CreateClinicForm.jsx";
import {useClinicById, useClinicByIdAuth} from "../features/Clinic/useClinic.js";
import Spinner from "../ui/Spinner.jsx";

const ClinicSettings = () => {

    return (
        <>

            <Row style={{marginBottom: '2rem'}}>
                <UpdateSettingsForm/>
                <GenerateSchedule/>
            </Row>


            <Row style={{marginBottom: '2rem'}}>
                <AccountDoctorSettings/>
            </Row>
            <Row style={{marginBottom: '2rem'}}>
                <AccountReceptionistSettings/>
            </Row>

            <Row style={{marginBottom: '2rem'}}>
                <AccountSpecializationSettings/>
            </Row>
{/*
            <Row>
                <AccountServicesSettings/>
            </Row>*/}
        </>
    );
};

export default ClinicSettings;