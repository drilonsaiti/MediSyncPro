import CreatePatientForm from "./CreatePatientForm.jsx";
import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

const AddPatient = () => {
    return <Modal>
        <Modal.Open opens={"patient-form"}>
            <Button>Add new patient</Button>
        </Modal.Open>
        <Modal.Window name={"patient-form"}>
            <CreatePatientForm/>
        </Modal.Window>
    </Modal>
};

export default AddPatient;
