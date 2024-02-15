import styled from 'styled-components';
import {formatDateMonth} from "../../utils/helpers.js";

// Styled components
const CardContainer = styled.div`
  border: 1px solid var(--color-grey-0);
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  display: inline-block;
`;

const CardHeader = styled.div`
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CardBody = styled.div`
  padding: 10px;
`;

const CardText = styled.p`
  margin-bottom: 10px;
    
`;


// Component
const AppointmentReminderCard = ({nextAppointments}) => {


    return (
        nextAppointments ?
            <CardContainer>
                <CardHeader>Next Appointment Reminder</CardHeader>
                <CardBody>
                    <CardText>

                        You have an upcoming appointment
                        with <strong>{nextAppointments.doctorName} </strong> at <strong>{nextAppointments.clinicName}</strong> on
                        <strong> {formatDateMonth(nextAppointments.appointmentDate)}</strong>.
                        Please make sure to attend it on time.
                    </CardText>
                </CardBody>
            </CardContainer>
            : null

    );
};

export default AppointmentReminderCard;
