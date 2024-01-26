import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import MedicalReportTable from "../features/MedicalReport/MedicalReportTable.jsx";
import AddMedicalReport from "../features/MedicalReport/AddMedicalReport.jsx";

const MedicalReport = () => {
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All medical reports</Heading>
                <p>Test</p>

            </Row>

            <Row>
                <MedicalReportTable/>
                <AddMedicalReport/>
            </Row>
        </>
    );
};

export default MedicalReport;