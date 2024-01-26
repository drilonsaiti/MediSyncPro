import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreatePatientForm from "./CreatePatientForm.jsx";
import {useCreatePatient} from "./useCreatePatient.js";
import {useDeletePatient} from "./useDeletePatient.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const PatientRow = ({patient}) => {
    const {patientId,patientName:name,gender,address,contactNumber,email,birthDay} = patient;
    const {isCreating,createPatient} = useCreatePatient();
    const {isDeleting,deleteMutate} = useDeletePatient();

    return (
        <Table.Row role="row">
            <Title>{patientId}</Title>
            <Title>{name}</Title>
            <Title>{address}</Title>
            <Title>{email}</Title>
            <Title>{contactNumber}</Title>

            <Title>{birthDay}</Title>
            <Title>{gender}</Title>
            <Modal>
                <ButtonGroup>

                        <Menus.Menu>
                            <Menus.Toggle id={patientId} />
                            <Menus.List id={patientId}>
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
                        <CreatePatientForm patientToEdit={patient} />
                    </Modal.Window>

                    <Modal.Window name="delete">
                        <ConfirmDelete resource="accommodations" disabled={isDeleting} onConfirm={() => deleteMutate(patientId)}/>
                    </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default PatientRow;