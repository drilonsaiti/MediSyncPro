import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useChangeAttended} from "./useChangeAttended.js";
import Table from "../../ui/Table.jsx";
import Stacked from "../../ui/Stacked.jsx";
import {isToday} from "date-fns";
import Tag from "../../ui/Tag.jsx";
import {formatDate} from "../../utils/helpers.js";
import {HiChevronDown, HiChevronUp} from "react-icons/hi2";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Menus from "../../ui/Menus.jsx";
import {HiEye, HiPencil, HiTrash} from "react-icons/hi";
import {FaClipboardList, FaFilePdf} from "react-icons/fa";
import CreateMedicalReportForm from "../MedicalReport/CreateMedicalReportForm.jsx";
import MedicalReportTable from "../MedicalReport/MedicalReportTable.jsx";
import styled from "styled-components";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import CreateAppointmentForm from "./CreateAppointmentForm.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import {deleteAppointment} from "../../services/apiAppointments.js";
import {useDeleteAppointment} from "./useDeleteAppointment.js";
import DownloadButton from "../MedicalReport/DownloadButton.jsx";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;

const Icon = styled.span`
    cursor: pointer;
`
const AppointmentForPatientRow = ({appointment}) => {
    const {appointmentId, patientId, patientName, patientEmail, doctorName, date, serviceName, attended,clinicId,report} = appointment;
    const navigate = useNavigate();
    const [status, setStatus] = useState(attended ? 'Yes' : 'No');
    const {deleteMutate,isDeleting} = useDeleteAppointment();

    const statusToTagName = {
        true: 'green',
        false: 'red',
        'today': 'silver',
    };


    console.log("REPORT REPORT " ,appointment)
    return (
        <Table.Row role="row">
            <Title>{appointmentId}</Title>
            <Stacked>
                <Title>{patientName}</Title>
                <span>{patientEmail}</span>
            </Stacked>
            <Title>{doctorName}</Title>
            {isToday ? <Tag type={statusToTagName["today"]}>{formatDate(date)}</Tag> :
                <Title>{formatDate(date)}</Title>}
            <Stacked>
                {serviceName.map(service => (<Title key={service}>{service}</Title>))}
            </Stacked>
            <Tag
                style={{display: "flex", gap: "0.5rem", alignItems: "center",}}
                type={statusToTagName[attended]}
            >{status} </Tag>

            {report !== null &&
                <div style={{display: 'flex', gap: '3rem'}}>
                    <ButtonIcon type="icon"><Link to={`/medicalReports/${report.reportId}`} target="_blank"><FaFilePdf /></Link></ButtonIcon>
                    <ButtonIcon type="icon">
                        <DownloadButton  medicalReport={report} isDownload/>

                    </ButtonIcon>
                </div>
            }

            {report === null &&
            <Modal>
                <ButtonGroup>
                    <Menus.Menu>
                        <Menus.Toggle id={appointmentId}/>
                        <Menus.List id={appointmentId}>



                            <Modal.Open opens="edit">
                                <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>

                            </Modal.Open>

                            <Modal.Window name="edit">
                                <CreateAppointmentForm appointmentToEdit={appointment} clinicId={clinicId} />
                            </Modal.Window>

                            <Modal.Window name="delete">
                                <ConfirmDelete resource="appointment" disabled={isDeleting}
                                               onConfirm={() => deleteMutate({appointmentId:appointmentId})}/>
                            </Modal.Window>

                        </Menus.List>
                    </Menus.Menu>


                </ButtonGroup>

                <Modal.Window name="create">
                    <CreateMedicalReportForm appointmentId={appointmentId} appointmentDate={date}/>
                </Modal.Window>

                <Modal.Window name="all-reports">
                    <MedicalReportTable/>
                </Modal.Window>

            </Modal>
            }
        </Table.Row>
    );
};

export default AppointmentForPatientRow;