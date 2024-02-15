import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreateClinicForm from "./CreateClinicForm.jsx";
import {useCreateClinic} from "./useCreateClinic.js";
import {useDeleteClinic} from "./useDeleteClinic.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const ClinicRow = ({clinic}) => {
    const {clinicId, clinicName: name, address} = clinic;
    const {isCreating, createClinic} = useCreateClinic();
    const {isDeleting, deleteMutate} = useDeleteClinic();

    return (
        <Table.Row role="row">
            <Title>{clinicId}</Title>
            <Title>{name}</Title>
            <Title>{address}</Title>

            <Modal>
                <ButtonGroup>

                    <Menus.Menu>
                        <Menus.Toggle id={clinicId}/>
                        <Menus.List id={clinicId}>
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
                    <CreateClinicForm clinicToEdit={clinic}/>
                </Modal.Window>

                <Modal.Window name="delete">
                    <ConfirmDelete resource="clinic" disabled={isDeleting}
                                   onConfirm={() => deleteMutate(clinicId)}/>
                </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default ClinicRow;