import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreateMedicalReportForm from "./CreateMedicalReportForm.jsx";
import {useCreateMedicalReport} from "./useCreateMedicalReport.js";
import {useDeleteMedicalReport} from "./useDeleteMedicalReport.js";
const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const MedicalReportRow = ({medicalReport}) => {
    const {reportId,patientId,doctor,appointmentDate} = medicalReport;
    const {isCreating,createMedicalReport} = useCreateMedicalReport();
    const {isDeleting,deleteMutate} = useDeleteMedicalReport();

    return (
        <Table.Row role="row">
            <Title>{reportId}</Title>
            <Title>{patientId}</Title>
            <Title>{doctor.doctorName}</Title>
            <Title>{appointmentDate}</Title>
            <Modal>
                <ButtonGroup>

                        <Menus.Menu>
                            <Menus.Toggle id={reportId} />
                            <Menus.List id={reportId}>
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
                        <CreateMedicalReportForm medicalReportToEdit={medicalReport} />
                    </Modal.Window>

                    <Modal.Window name="delete">
                        <ConfirmDelete resource="accommodations" disabled={isDeleting} onConfirm={() => deleteMutate(reportId)}/>
                    </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default MedicalReportRow;