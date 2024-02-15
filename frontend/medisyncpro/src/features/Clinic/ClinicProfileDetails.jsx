import Row from "../../ui/Row.jsx";

import Spinner from "../../ui/Spinner.jsx";
import ClinicHeaderBox from "./ClinicHeaderBox.jsx";
import ClinicAppointmentBox from "./ClinicAppointmentBox.jsx";
import {useMyClinicProfile} from "./useMyClinicProfile.js";

const ClinicProfileDetails = () => {
    const {isLoading, clinic} = useMyClinicProfile();

    if (isLoading) return <Spinner/>

    return (
        <>
            <Row style={{marginBottom: '4rem'}}>
                <ClinicHeaderBox clinic={clinic}/>
            </Row>


            <Row>
                <ClinicAppointmentBox doctors={clinic?.doctors ?? []}/>
            </Row>
        </>
    );
};

export default ClinicProfileDetails;