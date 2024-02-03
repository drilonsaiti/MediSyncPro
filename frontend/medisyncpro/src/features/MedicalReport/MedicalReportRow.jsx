import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiDocumentReport, HiDownload, HiEye, HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreateMedicalReportForm from "./CreateMedicalReportForm.jsx";
import {useCreateMedicalReport} from "./useCreateMedicalReport.js";
import {useDeleteMedicalReport} from "./useDeleteMedicalReport.js";
import Stacked from "../../ui/Stacked.jsx";
import {formatDateMonth} from "../../utils/helpers.js";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import MedicalReportPDF from "./MedicalReportPDF.jsx";
import {Link, useNavigate} from "react-router-dom";
import DownloadButton from "./DownloadButton.jsx";
import {HiDocumentCheck} from "react-icons/hi2";
import {FaFilePdf} from "react-icons/fa";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const MedicalReportRow = ({medicalReport}) => {
    const {
        reportId,
        patientId,
        patientName,
        patientEmail,
        doctorName,
        doctorId,
        services,
        appointmentDate
    } = medicalReport;
    const {isCreating, createMedicalReport} = useCreateMedicalReport();
    const {isDeleting, deleteMutate} = useDeleteMedicalReport();
    const navigate = useNavigate();
    const user = "doctor";
    return (
        <Table.Row role="row">
            <Title>{reportId}</Title>
            <Stacked>
                <Title>{patientName}</Title>
                <span>{patientEmail}</span>
            </Stacked>
            {user !== "doctor" ?
                <Title> {doctorName}</Title> :
                <Stacked>
                    {services.map(service => (<Title key={service.name}>{service.name}</Title>))}
                </Stacked>
            }
            <Title>{formatDateMonth(appointmentDate)}</Title>
            <Modal>
                <ButtonGroup>
                    {user === "doctor" ?
                        (<> <ButtonIcon>
                            <Link to={`/medicalReports/${reportId}`} target="_blank"><FaFilePdf /></Link>
                        </ButtonIcon>
                                <ButtonIcon>
                                    <DownloadButton reportId={reportId} medicalReport={medicalReport} isDownload/>

                                </ButtonIcon>
                            </>
                        )
                        :

                        <Menus.Menu>
                            <Menus.Toggle id={reportId}/>
                            <Menus.List id={reportId}>
                                <Modal.Open opens="edit">
                                    <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
                                </Modal.Open>
                                <Modal.Open opens="delete">
                                    <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                                </Modal.Open>

                            </Menus.List>
                        </Menus.Menu>
                    }


                </ButtonGroup>

                <Modal.Window name="report-details">

                    <MedicalReportPDF data={medicalReport}/>

                </Modal.Window>

                <Modal.Window name="edit">
                    <CreateMedicalReportForm medicalReportToEdit={medicalReport}/>
                </Modal.Window>

                <Modal.Window name="delete">
                    <ConfirmDelete resource="accommodations" disabled={isDeleting}
                                   onConfirm={() => deleteMutate(reportId)}/>
                </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default MedicalReportRow;