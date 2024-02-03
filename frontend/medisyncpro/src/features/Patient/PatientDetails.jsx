import PatientHeaderBox from "./PatientHeaderBox.jsx";
import Row from "../../ui/Row.jsx";
import PatientAppointmentBox from "./PatientAppointmentBox.jsx";
import {usePatientById} from "./usePatient.js";
import Spinner from "../../ui/Spinner.jsx";

const PatientDetails = () => {
    const {isLoading, patient} = usePatientById();

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

export default PatientDetails;