import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import ClinicScheduleTable from "../features/ClinicSchedule/ClinicScheduleTable.jsx";
import UpdateSettingsForm from "../features/Settings/UpdateSettingsForm.jsx";
import GenerateSchedule from "../features/ClinicSchedule/GenerateSchedule.jsx";
import ClinicScheduleTableOperations from "../features/ClinicSchedule/ClinicScheduleTableOperations.jsx";

const ClinicSchedule = () => {
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All schedule</Heading>

            </Row>

            <Row>
                {/*<ClinicScheduleTable/>
                <AddClinicSchedule/>*/}
                <UpdateSettingsForm/>
                <GenerateSchedule/>
            </Row>

            <Row style={{marginTop: '3rem'}}>
                <ClinicScheduleTableOperations/>
                <ClinicScheduleTable/>
            </Row>

        </>
    );
};

export default ClinicSchedule;