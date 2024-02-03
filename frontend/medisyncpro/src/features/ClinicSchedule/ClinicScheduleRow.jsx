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
import React, {useState} from "react";
import ClinicScheduleDetailedRow from "./ClinicScheduleDetailedRow.jsx";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import {HiChevronDown, HiChevronRight, HiChevronUp} from "react-icons/hi2";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const ClinicScheduleRow = ({clinicSchedule}) => {
    const {date, scheduleDtos} = clinicSchedule;
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const {isCreating, createClinicSchedule} = useCreateClinicSchedule();
    const {isDeleting, deleteMutate} = useDeleteClinicSchedule();

    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };
    return (
        <>
            <Table.Row role="row" onClick={toggleAccordion} style={{cursor: 'pointer'}}>
                <Title>{formatDateMonth(date)}</Title>
                <Title>{scheduleDtos.length}</Title>

                <Modal>
                    <ButtonGroup>
                        <ButtonIcon onClick={toggleAccordion}>
                            {isAccordionOpen ? <HiChevronDown/> : <HiChevronRight/> }
                        </ButtonIcon>

                        <Menus.Menu>
                            <Menus.Toggle id={date}/>
                            <Menus.List id={date}>
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
                        <CreateClinicScheduleForm clinicScheduleToEdit={clinicSchedule}/>
                    </Modal.Window>

                    <Modal.Window name="delete">
                        <ConfirmDelete resource="accommodations" disabled={isDeleting}
                                       onConfirm={() => deleteMutate(date)}/>
                    </Modal.Window>

                </Modal>

            </Table.Row>

            {isAccordionOpen && (
                <Menus>
                    <Table columns={'0.6fr 3fr repeat(4,1fr)'}>
                        <Table.Header>
                            <div>Id</div>
                            <div>Date</div>
                            <div>Doctor</div>
                            <div>Time</div>
                            <div>Booked</div>

                        </Table.Header>
                        <Table.Body data={scheduleDtos} render={
                            spc => <ClinicScheduleDetailedRow clinicSchedule={spc} key={spc.scheduleId}/>
                        }/>

                    </Table>
                </Menus>

            )}
        </>
    );
};

export default ClinicScheduleRow;