import {usePatientForProfile} from "./usePatient.js";
import Spinner from "../../ui/Spinner.jsx";
import Row from "../../ui/Row.jsx";
import PatientHeaderBox from "./PatientHeaderBox.jsx";
import PatientAppointmentBox from "./PatientAppointmentBox.jsx";

const PatientDetailsProfile = () => {
    const {isLoading, patient} = usePatientForProfile();

    if (isLoading) return <Spinner/>
    return (
        <>
            <Row style={{marginBottom: '4rem'}}>
                <PatientHeaderBox patient={patient}/>
            </Row>


            <Row>
                <PatientAppointmentBox patientId={patient.patientId}/>
            </Row>
        </>
    );
};

export default PatientDetailsProfile;