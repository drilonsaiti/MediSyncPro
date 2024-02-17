import {useDoctorById, useDoctorForProfile} from "./useDoctors.js";
import Spinner from "../../ui/Spinner.jsx";
import Row from "../../ui/Row.jsx";
import DoctorHeaderBox from "./DoctorHeaderBox.jsx";
import DoctorAppointmentBox from "./DoctorAppointmentBox.jsx";
import {useReceptionistForProfile} from "../Receptionist/useReceptionist.js";

const DoctorProfileDetails = () => {
    const {isLoading, doctor} = useDoctorForProfile();

    if (isLoading) return <Spinner/>

    return (
        <>
            <Row style={{marginBottom: '4rem'}}>
                <DoctorHeaderBox doctor={doctor}/>
            </Row>


            <Row>
                <DoctorAppointmentBox doctorId={doctor.doctorId}/>
            </Row>
        </>
    );
};

export default DoctorProfileDetails;