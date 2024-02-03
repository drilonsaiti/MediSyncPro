import Row from "../../ui/Row.jsx";

import Spinner from "../../ui/Spinner.jsx";
import {useReceptionistById} from "./useReceptionist.js";
import ReceptionistHeaderBox from "./ReceptionistHeaderBox.jsx";

const ReceptionistDetails = () => {
    const {isLoading, receptionist} = useReceptionistById();

    if (isLoading) return <Spinner/>

    return (
        <Row style={{marginBottom: '4rem'}}>
            <ReceptionistHeaderBox receptionist={receptionist}/>
        </Row>
    );
};

export default ReceptionistDetails;