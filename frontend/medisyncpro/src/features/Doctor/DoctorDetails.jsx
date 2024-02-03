import Row from "../../ui/Row.jsx";

import Spinner from "../../ui/Spinner.jsx";
import {useDoctorById} from "./useDoctors.js";
import DoctorHeaderBox from "./DoctorHeaderBox.jsx";
import DoctorAppointmentBox from "./DoctorAppointmentBox.jsx";

const DoctorDetails = () => {
    const {isLoading, doctor} = useDoctorById();

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

export default DoctorDetails;