import CreateClinicServiceForm from "./CreateClinicServiceForm.jsx";
import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

const AddClinicService = () => {
    return <Modal>
        <Modal.Open opens={"clinicService-form"}>
            <Button>Add new clinicService</Button>
        </Modal.Open>
        <Modal.Window name={"clinicService-form"}>
            <CreateClinicServiceForm/>
        </Modal.Window>
    </Modal>
};

export default AddClinicService;
