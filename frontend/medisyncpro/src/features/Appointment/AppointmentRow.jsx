import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiEye, HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreateAppointmentForm from "./CreateAppointmentForm.jsx";
import {useCreateAppointment} from "./useCreateAppointment.js";
import {useDeleteAppointment} from "./useDeleteAppointment.js";
import Stacked from "../../ui/Stacked.jsx";
import {formatDate} from "../../utils/helpers.js";
import Tag from "../../ui/Tag.jsx";
import {isToday} from "date-fns";
import CreateMedicalReportForm from "../MedicalReport/CreateMedicalReportForm.jsx";
import PatientDetails from "../Patient/PatientDetails.jsx";
import {useNavigate} from "react-router-dom";
import {FaClipboardList} from "react-icons/fa";
import MedicalReportTable from "../MedicalReport/MedicalReportTable.jsx";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;
const AppointmentRow = ({appointment}) => {
    const {appointmentId,patientId,patientName,patientEmail,doctorName,date,serviceName,attended} = appointment;
    const {isCreating,createAppointment} = useCreateAppointment();
    const {isDeleting,deleteMutate} = useDeleteAppointment();
    const navigate = useNavigate();
    const statusToTagName = {
        true: 'green',
        false: 'red',
        'today': 'silver',
    };
    console.log(typeof attended);
    return (
        <Table.Row role="row">
            <Title>{appointmentId}</Title>
            <Stacked>
                <Title>{patientName}</Title>
                <span>{patientEmail}</span>
            </Stacked>
            <Title>{doctorName}</Title>
            {isToday ? <Tag type={statusToTagName["today"]}>{formatDate(date)}</Tag> : <Title>{formatDate(date)}</Title>}
            <Stacked>
                {serviceName.map(service => (<Title key={service}>{service}</Title>))}
            </Stacked>
            <Tag type={statusToTagName[attended]}>{attended ? 'Yes' : 'No'}</Tag>
            <Modal>
                <ButtonGroup>

                        <Menus.Menu>
                            <Menus.Toggle id={appointmentId} />
                            <Menus.List id={appointmentId}>
                                <Modal.Open opens="create">
                                    <Menus.Button icon={<HiPencil/> }>Create report</Menus.Button>
                                </Modal.Open>
                                <Menus.Button
                                    onClick={() => navigate(`/patient/${patientId}`)}
                                    icon={<HiEye />}
                                >
                                    See patient
                                </Menus.Button>


                                <Modal.Open opens="all-reports">
                                    <Menus.Button icon={<FaClipboardList/> }>All reports</Menus.Button>
                                </Modal.Open>

                            </Menus.List>
                        </Menus.Menu>


                </ButtonGroup>

                    <Modal.Window name="create">
                        <CreateMedicalReportForm appointmentId={appointmentId} appointmentDate={date}/>
                    </Modal.Window>

                <Modal.Window name="all-reports">
                    <MedicalReportTable />
                </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default AppointmentRow;