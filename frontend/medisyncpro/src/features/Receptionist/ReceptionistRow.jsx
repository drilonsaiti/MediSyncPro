import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreateReceptionistForm from "./CreateReceptionistForm.jsx";
import {useCreateReceptionist} from "./useCreateReceptionist.js";
import {useDeleteReceptionist} from "./useDeleteReceptionist.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const ReceptionistRow = ({receptionist}) => {
    const {receptionistId,receptionistName:name,emailAddress:email,clinicId} = receptionist;
    const {isCreating,createReceptionist} = useCreateReceptionist();
    const {isDeleting,deleteMutate} = useDeleteReceptionist();

    return (
        <Table.Row role="row">
            <Title>{receptionistId}</Title>
            <Title>{name}</Title>
            <Title>{email}</Title>
            <Title>{clinicId}</Title>
            <Modal>
                <ButtonGroup>

                        <Menus.Menu>
                            <Menus.Toggle id={receptionistId} />
                            <Menus.List id={receptionistId}>
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
                        <CreateReceptionistForm receptionistToEdit={receptionist} />
                    </Modal.Window>

                    <Modal.Window name="delete">
                        <ConfirmDelete resource="accommodations" disabled={isDeleting} onConfirm={() => deleteMutate(receptionistId)}/>
                    </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default ReceptionistRow;