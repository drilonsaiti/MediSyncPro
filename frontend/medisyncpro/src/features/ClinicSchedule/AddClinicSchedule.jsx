import CreateClinicScheduleForm from "./CreateClinicScheduleForm.jsx";
import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

const AddClinicSchedule = () => {
    return <Modal>
        <Modal.Open opens={"clinicSchedule-form"}>
            <Button>Add new clinic schedule</Button>
        </Modal.Open>
        <Modal.Window name={"clinicSchedule-form"}>
            <CreateClinicScheduleForm/>
        </Modal.Window>
    </Modal>
};

export default AddClinicSchedule;
