import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import styled from "styled-components";
import {useDeleteMedicalReport} from "./useDeleteMedicalReport.js";
import Stacked from "../../ui/Stacked.jsx";
import {formatDateMonth} from "../../utils/helpers.js";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import MedicalReportPDF from "./MedicalReportPDF.jsx";
import {Link} from "react-router-dom";
import DownloadButton from "./DownloadButton.jsx";
import {FaFilePdf} from "react-icons/fa";

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono", sans-serif;
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
    const {isDeleting, deleteMutate} = useDeleteMedicalReport();

    return (
        <Table.Row role="row">
            <Title>{reportId}</Title>
            <Stacked>
                <Title>{patientName}</Title>
                <span>{patientEmail}</span>
            </Stacked>

            <Title> {doctorName}</Title>
            <Stacked>
                {services.map(service => (<Title key={service.name}>{service.name}</Title>))}
            </Stacked>

            <Title>{formatDateMonth(appointmentDate)}</Title>
            <Modal>
                <ButtonGroup>

                    <> <ButtonIcon>
                    <Link to={`/medicalReports/${reportId}`} target="_blank"><FaFilePdf/></Link>
                </ButtonIcon>
                    <ButtonIcon>
                        <DownloadButton reportId={reportId} medicalReport={medicalReport} isDownload/>

                    </ButtonIcon>
                </>
                </ButtonGroup>

                <Modal.Window name="report-details">

                    <MedicalReportPDF data={medicalReport}/>

                </Modal.Window>


            </Modal>
        </Table.Row>
    );
};

export default MedicalReportRow;