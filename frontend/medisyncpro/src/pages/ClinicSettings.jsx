import React from 'react';
import Row from "../ui/Row.jsx";
import UpdateSettingsForm from "../features/Settings/UpdateSettingsForm.jsx";
import AccountDoctorSettings from "../features/Settings/AccountDoctorSettings.jsx";
import AccountReceptionistSettings from "../features/Settings/AccountReceptionistSettings.jsx";
import GenerateSchedule from "../features/ClinicSchedule/GenerateSchedule.jsx";

const ClinicSettings = () => {
    return (
        <>
        <Row style={{marginBottom: '2rem'}}>
            <UpdateSettingsForm />
            <GenerateSchedule/>
        </Row>
            <Row style={{marginBottom: '2rem'}}>
            <AccountDoctorSettings/>
        </Row>
        <Row>
            <AccountReceptionistSettings/>
        </Row>
        </>
    );
};

export default ClinicSettings;