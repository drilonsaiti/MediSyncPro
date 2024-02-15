import styled, {createGlobalStyle} from "styled-components";
import {StyledBox} from "./DoctorHeaderBox.jsx";
import {HiPencil} from "react-icons/hi";
import Heading from "../../ui/Heading.jsx";
import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Stacked from "../../ui/Stacked.jsx";
import {useAppointmentsByDoctor} from "../Appointment/useAppointments.js";
import {formatDateMonth} from "../../utils/helpers.js";
import Spinner from "../../ui/Spinner.jsx";
import {addDays, startOfDay} from "date-fns";
import {differenceInDays} from "date-fns/differenceInDays";
import Modal from "../../ui/Modal.jsx";
import CreateMedicalReportForm from "../MedicalReport/CreateMedicalReportForm.jsx";

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
    
    .react-datepicker__day-highlighted{
        background-color: transparent !important;
        color: var(--color-primary-700) !important;
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
    .react-datepicker__day--highlighted:not(.react-datepicker__day--selected),
    .react-datepicker__month-text--highlighted:not(.react-datepicker__day--selected),
    .react-datepicker__quarter-text--highlighted:not(.react-datepicker__day--selected),
    .react-datepicker__year-text--highlighted:not(.react-datepicker__day--selected) {
        background-color: transparent !important;
        color: var(--color-primary-700) !important;
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
const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
    background-color: var(--color-brand-700);
    color: var(--color-grey-0);
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-primary-1400);
      color: var(--color-grey-0);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;


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
const DoctorAppointmentBox = ({doctorId}) => {
    const [startDate, setStartDate] = useState(new Date());
    const {isLoading, appointments} = useAppointmentsByDoctor();

    if (isLoading) return <Spinner/>

    let filteredAppointments = appointments?.filter(app => {
        const appDate = new Date(app.date).toDateString();
        const startDateString = startDate.toDateString();
        return appDate === startDateString;
    });

    const highlightedDates = appointments?.map(app => {
        const appointmentDate = startOfDay(new Date(app.date));
        const dayDifference = differenceInDays(startOfDay(startDate), appointmentDate);
        const adjustedDate = dayDifference <= 0 ? addDays(startDate, Math.abs(dayDifference)) : undefined;
        return adjustedDate;
    });
    return (
        <StyledBox>
            <Container>
                <Appointments>
                    {filteredAppointments?.map(app => {
                        return (
                            <AppointmentsItem key={app.appointmentId}>

                                <Heading type="h2" style={{marginTop: '2rem'}}>{app.serviceName}</Heading>
                                <Modal>
                                    <Modal.Open opens="medical-report">

                                        <StyledButton><HiPencil/> Create medical report</StyledButton>

                                    </Modal.Open>
                                    <Modal.Window name="medical-report">

                                        <CreateMedicalReportForm appointmentId={app.appointmentId}/>

                                    </Modal.Window>

                                </Modal>

                                <Heading type="h3">{formatDateMonth(app.date)}</Heading>
                                <Doctor>
                                    <Avatar src="http://localhost:5173/default-user.jpg"/>
                                    <Stacked>
                                        <Title>{app.patientName}</Title>
                                        <span>Patient</span>
                                    </Stacked>
                                </Doctor>
                            </AppointmentsItem>
                        )
                    })}

                </Appointments>

                <Calendar>
                    <Heading type="h2" style={{color: 'white'}}>Select date</Heading>
                    <DatePicker
                        wrapperClassName='date_picker full-width'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        highlightDates={highlightedDates}
                        inline
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                    />
                    <DatePickerWrapperStyles/>
                </Calendar>
            </Container>
        </StyledBox>
    );
};

export default DoctorAppointmentBox;