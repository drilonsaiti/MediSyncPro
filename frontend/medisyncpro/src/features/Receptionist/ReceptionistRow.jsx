import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import {useCreateReceptionist} from "./useCreateReceptionist.js";
import {Link, useNavigate} from "react-router-dom";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import {FaEye} from "react-icons/fa6";
import {useDeleteReceptionistFromClinic} from "./useDeleteReceptionistFromClinic.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const ReceptionistRow = ({receptionist}) => {
    const {receptionistId, receptionistName: name, emailAddress: email, clinicId} = receptionist;
    const {isCreating, createReceptionist} = useCreateReceptionist();
    const {isDeleting, deleteMutate} = useDeleteReceptionistFromClinic();
    const navigate = useNavigate();

    return (
        <Table.Row role="row">
            <Title>{receptionistId}</Title>
            <Title>{name}</Title>
            <Title>{email}</Title>
            <Title>{clinicId}</Title>
            <Modal>
                <ButtonGroup>

                    <ButtonIcon>
                        <Link to={`/receptionist/${receptionistId}`}>
                            <FaEye/>
                        </Link>

                    </ButtonIcon>

                    <Menus.Menu>
                        <Menus.Toggle id={receptionistId}/>
                        <Menus.List id={receptionistId}>
                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                            </Modal.Open>

                        </Menus.List>
                    </Menus.Menu>


                </ButtonGroup>


                <Modal.Window name="delete">
                    <ConfirmDelete resource="accommodations" disabled={isDeleting}
                                   onConfirm={() => deleteMutate(receptionistId)}/>
                </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default ReceptionistRow;