import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreateSpecializationForm from "./CreateSpecializationForm.jsx";
import {useCreateSpecializations} from "./useCreateSpecializations.js";
import {useDeleteSpecializations} from "./useDeleteSpecializations.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const SpecializationsRow = ({specialization}) => {
    const {specializationId, specializationName: name} = specialization;
    const {isCreating, createSpecializations} = useCreateSpecializations();
    const {isDeleting, deleteMutate} = useDeleteSpecializations();

    return (
        <Table.Row role="row">
            <Title>{specializationId}</Title>
            <Title>{name}</Title>

            <Modal>
                <ButtonGroup>

                    <Menus.Menu>
                        <Menus.Toggle id={specializationId}/>
                        <Menus.List id={specializationId}>
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
                    <CreateSpecializationForm specializationToEdit={specialization}/>
                </Modal.Window>

                <Modal.Window name="delete">
                    <ConfirmDelete resource="specialization" disabled={isDeleting}
                                   onConfirm={() => deleteMutate(specializationId)}/>
                </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default SpecializationsRow;