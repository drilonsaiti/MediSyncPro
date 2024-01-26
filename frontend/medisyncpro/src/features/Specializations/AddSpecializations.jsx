import CreateSpecializationForm from "./CreateSpecializationForm.jsx";
import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

const AddSpecializations = () => {
    return <Modal>
        <Modal.Open opens={"specialization-form"}>
            <Button>Add new specialization</Button>
        </Modal.Open>
        <Modal.Window name={"specialization-form"}>
            <CreateSpecializationForm/>
        </Modal.Window>
    </Modal>
};

export default AddSpecializations;
