import Row from "../../ui/Row.jsx";

import Spinner from "../../ui/Spinner.jsx";
import ClinicHeaderBox from "./ClinicHeaderBox.jsx";
import {useClinicById} from "./useClinic.js";
import ClinicAppointmentBox from "./ClinicAppointmentBox.jsx";

const ClinicDetails = () => {
    const {isLoading, clinic} = useClinicById();

    if (isLoading) return <Spinner/>

    return (
        <>
            <Row style={{marginBottom: '4rem'}}>
                <ClinicHeaderBox clinic={clinic}/>
            </Row>


            <Row>
                <ClinicAppointmentBox doctors={clinic.doctors}/>
            </Row>
        </>
    );
};

export default ClinicDetails;