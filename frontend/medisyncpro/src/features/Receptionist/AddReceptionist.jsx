import CreateReceptionistForm from "./CreateReceptionistForm.jsx";
import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

const AddReceptionist = () => {
    return <Modal>
        <Modal.Open opens={"receptionist-form"}>
            <Button>Add new receptionist</Button>
        </Modal.Open>
        <Modal.Window name={"receptionist-form"}>
            <CreateReceptionistForm/>
        </Modal.Window>
    </Modal>
};

export default AddReceptionist;
