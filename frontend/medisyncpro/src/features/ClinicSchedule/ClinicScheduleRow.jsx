import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreateClinicScheduleForm from "./CreateClinicScheduleForm.jsx";
import {useCreateClinicSchedule} from "./useCreateClinicSchedule.js";
import {useDeleteClinicSchedule} from "./useDeleteClinicSchedule.js";
import {formatDateMonth} from "../../utils/helpers.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const ClinicScheduleRow = ({clinicSchedule}) => {
    const {scheduleId,date} = clinicSchedule;
    const {isCreating,createClinicSchedule} = useCreateClinicSchedule();
    const {isDeleting,deleteMutate} = useDeleteClinicSchedule();

    return (
        <Table.Row role="row">
            <Title>{scheduleId}</Title>
            <Title>{formatDateMonth(date)}</Title>

            <Modal>
                <ButtonGroup>

                        <Menus.Menu>
                            <Menus.Toggle id={scheduleId} />
                            <Menus.List id={scheduleId}>
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
                        <CreateClinicScheduleForm clinicScheduleToEdit={clinicSchedule} />
                    </Modal.Window>

                    <Modal.Window name="delete">
                        <ConfirmDelete resource="accommodations" disabled={isDeleting} onConfirm={() => deleteMutate(scheduleId)}/>
                    </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default ClinicScheduleRow;