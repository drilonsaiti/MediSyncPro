import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiEye, HiPencil} from "react-icons/hi";
import styled from "styled-components";
import Stacked from "../../ui/Stacked.jsx";
import {formatDate} from "../../utils/helpers.js";
import Tag from "../../ui/Tag.jsx";
import {isToday} from "date-fns";
import CreateMedicalReportForm from "../MedicalReport/CreateMedicalReportForm.jsx";
import {useNavigate} from "react-router-dom";
import {FaClipboardList} from "react-icons/fa";
import MedicalReportTable from "../MedicalReport/MedicalReportTable.jsx";
import {useState} from "react";
import {HiChevronDown, HiChevronUp} from "react-icons/hi2";
import {useChangeAttended} from "./useChangeAttended.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;

const Icon = styled.span`
    cursor: pointer;
`
const AppointmentRow = ({appointment}) => {
    const {appointmentId, patientId, patientName, patientEmail, doctorName, date, serviceName, attended} = appointment;
    const navigate = useNavigate();
    const [status, setStatus] = useState(attended ? 'Yes' : 'No');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {attendedMutate, isCreating} = useChangeAttended();

    const statusToTagName = {
        true: 'green',
        false: 'red',
        'today': 'silver',
    };
    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setIsDropdownOpen(false);
        const data = {
            appointmentId: appointmentId,
            attended: status === "Yes" ? false : true
        }
        attendedMutate(data);
    };
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
            {status === 'Yes' ? (
                <div>
                    <Tag
                        style={{display: "flex", gap: "0.5rem", alignItems: "center",}}
                        type={statusToTagName[true]}
                        onClick={handleToggleDropdown}
                    >
                        {status}
                        <Icon>{isDropdownOpen ? <HiChevronUp/> : <HiChevronDown/>}</Icon>
                    </Tag>
                    {isDropdownOpen && (
                        <div>
                            <Tag style={{
                                cursor: "pointer",
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center",
                                marginTop: "1rem"
                            }}
                                 type={statusToTagName[false]}
                                 onClick={() => handleStatusChange('No')}
                            >
                                No
                            </Tag>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <Tag
                        style={{display: "flex", gap: "0.5rem", alignItems: "center",}}
                        type={statusToTagName[attended]}
                        onClick={handleToggleDropdown}
                    >
                        {status}
                        <Icon>{isDropdownOpen ? <HiChevronUp/> : <HiChevronDown/>}</Icon>
                    </Tag>
                    {isDropdownOpen && (
                        <div>
                            <Tag style={{
                                cursor: "pointer",
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center",
                                marginTop: "1rem"
                            }}
                                 type={statusToTagName[true]}
                                 onClick={() => handleStatusChange('Yes')}
                            >
                                Yes
                            </Tag>
                        </div>
                    )}
                </div>
            )}

            <Modal>
                <ButtonGroup>
                    <Menus.Menu>
                        <Menus.Toggle id={appointmentId}/>
                        <Menus.List id={appointmentId}>
                            <Modal.Open opens="create">
                                <Menus.Button icon={<HiPencil/>}>Create report</Menus.Button>
                            </Modal.Open>
                            <Menus.Button
                                onClick={() => navigate(`/patient/${patientId}`)}
                                icon={<HiEye/>}
                            >
                                See patient
                            </Menus.Button>
                            <Modal.Open opens="all-reports">
                                <Menus.Button icon={<FaClipboardList/>}>All reports</Menus.Button>
                            </Modal.Open>
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
        </Table.Row>
    );
};

export default AppointmentRow;