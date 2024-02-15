import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import {useCreateClinicSchedule} from "./useCreateClinicSchedule.js";
import {formatDateMonthWithoutHour} from "../../utils/helpers.js";
import React, {useState} from "react";
import ClinicScheduleDetailedRow from "./ClinicScheduleDetailedRow.jsx";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import {HiChevronDown, HiChevronRight} from "react-icons/hi2";
import {useDeleteGroupedClinicSchedule} from "./useDeleteGroupedClinicSchedule.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const ClinicScheduleRow = ({clinicSchedule}) => {
    const {clinicId, date, scheduleDtos} = clinicSchedule;
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const {isCreating, createClinicSchedule} = useCreateClinicSchedule();
    const {isDeleting, deleteMutate} = useDeleteGroupedClinicSchedule();


    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };
    return (
        <>
            <Table.Row role="row" onClick={toggleAccordion} style={{cursor: 'pointer'}}>
                <Title>{formatDateMonthWithoutHour(date)}</Title>
                <Title>{scheduleDtos.length}</Title>

                <Modal>
                    <ButtonGroup>
                        <ButtonIcon onClick={toggleAccordion}>
                            {isAccordionOpen ? <HiChevronDown/> : <HiChevronRight/>}
                        </ButtonIcon>

                        <Menus.Menu>
                            <Menus.Toggle id={date}/>
                            <Menus.List id={date}>
                                <Modal.Open opens="delete">
                                    <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                                </Modal.Open>

                            </Menus.List>
                        </Menus.Menu>


                    </ButtonGroup>

                    <Modal.Window name="delete">
                        <ConfirmDelete resource="schedule" disabled={isDeleting}
                                       onConfirm={() => {
                                           deleteMutate({clinicId, date})
                                       }}/>
                    </Modal.Window>

                </Modal>

            </Table.Row>

            {isAccordionOpen && (
                <Menus>
                    <Table columns={'0.6fr 3fr repeat(3,1fr)'}>
                        <Table.Header>
                            <div>Id</div>
                            <div>Date</div>
                            <div>Doctor</div>
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