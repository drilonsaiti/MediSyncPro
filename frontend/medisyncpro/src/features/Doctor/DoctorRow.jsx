import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreateDoctorForm from "./CreateDoctorForm.jsx";
import {useCreateDoctor} from "./useCreateDoctor.js";
import {useDeleteDoctor} from "./useDeleteDoctor.js";
import {Link} from "react-router-dom";
import {FaEye} from "react-icons/fa6";
import ButtonIcon from "../../ui/ButtonIcon.jsx";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const DoctorRow = ({doctor}) => {
    const {doctorId, doctorName: name, specialization, workingDays} = doctor;
    const {isCreating, createDoctor} = useCreateDoctor();
    const {isDeleting, deleteMutate} = useDeleteDoctor();

    return (
        <Table.Row role="row">
            <Title>{doctorId}</Title>
            <Title>{name}</Title>
            <Title>{specialization.specializationName}</Title>
            <Title>{workingDays}</Title>
            <Modal>
                <ButtonGroup>

                    <ButtonIcon>
                        <Link to={`/doctors/${doctorId}`}>
                            <FaEye/>
                        </Link>

                    </ButtonIcon>

                    <Menus.Menu>
                        <Menus.Toggle id={doctorId}/>
                        <Menus.List id={doctorId}>
                            <Modal.Open opens="edit">
                                <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
                            </Modal.Open>
                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                            </Modal.Open>

                        </Menus.List>
                    </Menus.Menu>


                </ButtonGroup>

                <Modal.Window name="edit">
                    <CreateDoctorForm doctorToEdit={doctor}/>
                </Modal.Window>

                <Modal.Window name="delete">
                    <ConfirmDelete resource="accommodations" disabled={isDeleting}
                                   onConfirm={() => deleteMutate(doctorId)}/>
                </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default DoctorRow;