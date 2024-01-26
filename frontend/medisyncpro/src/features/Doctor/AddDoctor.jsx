import CreateDoctorForm from "./CreateDoctorForm.jsx";
import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

const AddDoctor = () => {
    return <Modal>
        <Modal.Open opens={"doctor-form"}>
            <Button>Add new doctor</Button>
        </Modal.Open>
        <Modal.Window name={"doctor-form"}>
            <CreateDoctorForm/>
        </Modal.Window>
    </Modal>
};

export default AddDoctor;
