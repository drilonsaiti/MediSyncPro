import styled, {createGlobalStyle} from "styled-components";
import {StyledBox} from "./PatientHeaderBox.jsx";
import Tag from "../../ui/Tag.jsx";
import {FaFilePdf} from "react-icons/fa";
import {HiEye, HiPencil} from "react-icons/hi";
import Heading from "../../ui/Heading.jsx";
import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import Stacked from "../../ui/Stacked.jsx";
import {useAppointments, useAppointmentsByPatient} from "../Appointment/useAppointments.js";
import {formatDate, formatDateMonth} from "../../utils/helpers.js";
import Spinner from "../../ui/Spinner.jsx";

const DatePickerWrapperStyles = createGlobalStyle`
    


    .react-datepicker {
        font-size: 1.42rem !important;
        color: #fff !important;
        background-color: #1C1F21;
        border-radius: 20px;
    }
    
    .react-datepicker__header{
        background-color: #1C1F21;
        color: #fff !important;

    }

    .react-datepicker__current-month {
        font-size: 1.5rem !important;
        color: #fff !important;

    }

    .react-datepicker__header {
        padding-top: 7px !important;
        color: #fff !important;
        border-top-left-radius: 20px !important;
        border-top-right-radius: 20px !important;
    }

    .react-datepicker__navigation {
        top: 7px !important;
        color: #fff !important;

    }
    .react-datepicker__day--selected{
        background-color: var(--color-primary-900);
        text-align: center;
        color: #fff !important;

    }
    
    
    .react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover, .react-datepicker__month-text--selected:hover, .react-datepicker__month-text--in-selecting-range:hover, .react-datepicker__month-text--in-range:hover, .react-datepicker__quarter-text--selected:hover, .react-datepicker__quarter-text--in-selecting-range:hover, .react-datepicker__quarter-text--in-range:hover, .react-datepicker__year-text--selected:hover, .react-datepicker__year-text--in-selecting-range:hover, .react-datepicker__year-text--in-range:hover {
        background-color: var(--color-primary-900);
    }
    .react-datepicker__day--keyboard-selected{
        background-color: var(--color-primary-300);

    }
    .react-datepicker__day--keyboard-selected:hover, .react-datepicker__month-text--keyboard-selected:hover, .react-datepicker__quarter-text--keyboard-selected:hover, .react-datepicker__year-text--keyboard-selected:hover {
        background-color: var(--color-primary-300);
    }
    
    .react-datepicker__day:hover{
        background-color: var(--color-primary-900);
        color: var(--color-grey-0);

    }

    .react-datepicker__day-name, .react-datepicker__day {
        margin: 1.08rem !important;
        color: #fff !important;
    }
    .react-datepicker__day {
        &--outside-month {
            color: var(--color-grey-400) !important;
        }
    }
    
    .react-datepicker__month-container{
        float: none !important;
        color: #fff !important;

    }


    input {
        display: block;
        border: none;
        background-color: transparent;

        &:focus {
            outline: none;
        }
    }
`;
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 5rem;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    
`

const Appointments = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 4rem;
    
`

const AppointmentsItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 3rem;
    padding: 10px 20px;
    border-radius: 20px;
    border: 2px solid #ccc;
    color: #087f5b;
    align-self: start;
    width: 29rem;
    & svg {
        width: 2rem;
        height: 2rem;
        color: var(--color-brand-700);
        transition: all 0.3s;
    }

`
const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Sono",sans-serif;
`;

const Doctor = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
`

const Calendar = styled.div`
    background-color: var(--color-grey-800);
    color: var(--color-grey-0);
    padding: 2rem 2rem;
    border-radius: 20px;
    align-self: start;
    justify-self: end;
    max-width: 65%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
`

const Icons = styled.div`
    display: flex;
    gap: 2rem;
`

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;
const PatientAppointmentBox = ({patientId}) => {
    const [startDate, setStartDate] = useState(new Date());
    const {isLoading,appointments} = useAppointmentsByPatient(patientId);

    if (isLoading) return <Spinner/>

    let filteredAppointments = appointments.filter(app => {
        const appDate = new Date(app.date).toDateString();
        const startDateString = startDate.toDateString();
        console.log(appDate, startDateString);
        console.log(appDate === startDateString);
        return appDate === startDateString;
    });
    return (
        <StyledBox>
            <Container>
                <Appointments>
                    {filteredAppointments.map(app => {
                        return(
                            <AppointmentsItem key={app.appointmentId}>

                                <Heading type="h2" style={{marginTop: '2rem'}}>{app.serviceName}</Heading>
                                <Icons>
                                    <ButtonIcon type="icon"><HiEye /></ButtonIcon>
                                    <ButtonIcon type="icon"><FaFilePdf /></ButtonIcon>
                                    <ButtonIcon type="icon"><HiPencil /></ButtonIcon>
                                </Icons>

                                <Heading type="h3">{formatDateMonth(app.date)}</Heading>
                                <Doctor>
                                    <Avatar src="http://localhost:5173/default-user.jpg"/>
                                    <Stacked>
                                        <Title>{app.doctorName}</Title>
                                        <span>{app.doctorSpecializations}</span>
                                    </Stacked>
                                </Doctor>
                            </AppointmentsItem>
                        )
                    })}

                </Appointments>

                <Calendar>
                    <Heading type="h2">Select date</Heading>
                    <DatePicker
                        wrapperClassName='date_picker full-width'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        inline
                    />
                    <DatePickerWrapperStyles/>
                </Calendar>
            </Container>
        </StyledBox>
    );
};

export default PatientAppointmentBox;