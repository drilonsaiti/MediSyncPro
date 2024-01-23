import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreateAppointmentForm from "./CreateAppointmentForm.jsx";
import {useCreateAppointment} from "./useCreateAppointment.js";
import {useDeleteAppointment} from "./useDeleteAppointment.js";
const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const AppointmentRow = ({appointment}) => {
    const {appointmentId,date} = appointment;
    const {isCreating,createAppointment} = useCreateAppointment();
    const {isDeleting,deleteMutate} = useDeleteAppointment();

    return (
        <Table.Row role="row">
            <Title>{appointmentId}</Title>
            <Title>{date}</Title>

            <Modal>
                <ButtonGroup>

                        <Menus.Menu>
                            <Menus.Toggle id={appointmentId} />
                            <Menus.List id={appointmentId}>
                                <Modal.Open opens="edit">
                                    <Menus.Button icon={<HiPencil/> }>Edit</Menus.Button>
                                </Modal.Open>
                                <Modal.Open opens="delete">
                                    <Menus.Button icon={<HiTrash/> }>Delete</Menus.Button>
                                </Modal.Open>

                            </Menus.List>
                        </Menus.Menu>


                </ButtonGroup>

                    <Modal.Window name="edit">
                        <CreateAppointmentForm appointmentToEdit={appointment} />
                    </Modal.Window>

                    <Modal.Window name="delete">
                        <ConfirmDelete resource="accommodations" disabled={isDeleting} onConfirm={() => deleteMutate(appointmentId)}/>
                    </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default AppointmentRow;