import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import SpecializationsTable from "../features/Specializations/SpecializationsTable.jsx";
import AddSpecializations from "../features/Specializations/AddSpecializations.jsx";

const Specializations = () => {
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All specializations</Heading>
            </Row>

            <Row>
                <SpecializationsTable/>
                <AddSpecializations/>
            </Row>


        </>
    );
};

export default Specializations;