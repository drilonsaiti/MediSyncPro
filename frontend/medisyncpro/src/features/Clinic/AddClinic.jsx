import CreateClinicForm from "./CreateClinicForm.jsx";
import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

const AddClinic = () => {
    return <Modal>
        <Modal.Open opens={"clinic-form"}>
            <Button>Add new clinic</Button>
        </Modal.Open>
        <Modal.Window name={"clinic-form"}>
            <CreateClinicForm/>
        </Modal.Window>
    </Modal>
};

export default AddClinic;
