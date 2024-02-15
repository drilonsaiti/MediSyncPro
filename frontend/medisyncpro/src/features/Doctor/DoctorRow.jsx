import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import {useCreateDoctor} from "./useCreateDoctor.js";
import {Link} from "react-router-dom";
import {FaEye} from "react-icons/fa6";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import {useDeleteDoctorFromClinic} from "./useDeleteDoctorFromClinic.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const DoctorRow = ({doctor}) => {
    const {doctorId, doctorName: name, specialization, workingDays, clinic} = doctor;
    const {isCreating, createDoctor} = useCreateDoctor();
    const {isDeleting, deleteMutate} = useDeleteDoctorFromClinic();

    return (
        <Table.Row role="row">
            <Title>{doctorId}</Title>
            <Title>{name}</Title>
            <Title>{specialization?.specializationName ?? ''}</Title>
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
                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash/>}>Delete from clinic</Menus.Button>
                            </Modal.Open>

                        </Menus.List>
                    </Menus.Menu>


                </ButtonGroup>

                <Modal.Window name="delete">
                    <ConfirmDelete resource={`doctor from clinic`} disabled={isDeleting}
                                   onConfirm={() => deleteMutate({doctorId, clinicId: clinic.clinicId})}/>
                </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default DoctorRow;