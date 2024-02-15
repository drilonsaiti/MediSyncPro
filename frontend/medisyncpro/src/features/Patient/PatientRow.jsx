import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import styled from "styled-components";
import {useCreatePatient} from "./useCreatePatient.js";
import {useDeletePatient} from "./useDeletePatient.js";
import {Link} from "react-router-dom";
import {FaEye} from "react-icons/fa6";
import ButtonIcon from "../../ui/ButtonIcon.jsx";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const PatientRow = ({patient}) => {
    const {patientId, patientName: name, gender, address, contactNumber, email, birthDay} = patient;
    const {isCreating, createPatient} = useCreatePatient();
    const {isDeleting, deleteMutate} = useDeletePatient();

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
                    <ButtonIcon>
                        <Link to={`/patient/${patientId}`}>
                            <FaEye/>
                        </Link>

                    </ButtonIcon>
                </ButtonGroup>
            </Modal>
        </Table.Row>
    );
};

export default PatientRow;