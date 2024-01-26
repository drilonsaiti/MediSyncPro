import CreateMedicalReportForm from "./CreateMedicalReportForm.jsx";
import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

const AddMedicalReport = () => {
    return <Modal>
        <Modal.Open opens={"medicalReport-form"}>
            <Button>Add new medical report</Button>
        </Modal.Open>
        <Modal.Window name={"medicalReport-form"}>
            <CreateMedicalReportForm/>
        </Modal.Window>
    </Modal>
};

export default AddMedicalReport;
