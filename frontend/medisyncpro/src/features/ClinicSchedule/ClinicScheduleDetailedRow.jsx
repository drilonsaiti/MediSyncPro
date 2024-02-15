import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import {useCreateClinicSchedule} from "./useCreateClinicSchedule.js";
import {useDeleteClinicSchedule} from "./useDeleteClinicSchedule.js";
import {formatDateMonthWithoutHour} from "../../utils/helpers.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;

const Price = styled.div`
  font-family: "Sono",sans-serif;
  font-weight: 600;
`;

const ClinicScheduleDetailedRow = ({clinicSchedule}) => {
    const {id, date, doctorName, timeSlot, isBooked} = clinicSchedule;
    const {isCreating, createClinicSchedule} = useCreateClinicSchedule();
    const {isDeleting, deleteMutate} = useDeleteClinicSchedule();

    return (
        <Table.Row role="row">
            <Title>{id}</Title>
            <Title>{formatDateMonthWithoutHour(date)} - {timeSlot}</Title>
            <Title>{doctorName}</Title>
            <Title>{isBooked ? 'Yes' : 'No'}</Title>
            <Modal>
                <ButtonGroup>

                    <Menus.Menu>
                        <Menus.Toggle id={id}/>
                        <Menus.List id={id}>
                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                            </Modal.Open>

                        </Menus.List>
                    </Menus.Menu>


                </ButtonGroup>


                <Modal.Window name="delete">
                    <ConfirmDelete resource={`schedule#${id}`} disabled={isDeleting}
                                   onConfirm={() => deleteMutate(id)}/>
                </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default ClinicScheduleDetailedRow;