import CreateAppointmentForm from "./CreateAppointmentForm.jsx";
import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

const AddAppointment = () => {
    return <Modal>
        <Modal.Open opens={"appointment-form"}>
            <Button>Add new appointment</Button>
        </Modal.Open>
        <Modal.Window name={"appointment-form"}>
            <CreateAppointmentForm/>
        </Modal.Window>
    </Modal>
};

export default AddAppointment;
