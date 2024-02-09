import styled from 'styled-components';
import {HiUser} from "react-icons/hi2";
import Heading from "./Heading.jsx";
import {FaHouseMedical, FaUserDoctor, FaUserPen} from "react-icons/fa6";
import {FaHospitalUser} from "react-icons/fa";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const Card = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin: 2rem;
    text-align: left;
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    

    p {
        color: #666;
        line-height: 1.6;
        width: 100%;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
`

const Type = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`

const Icon = styled.div`

    & svg {
        color: var(--color-brand-700);
        height: 2.5rem;
        width: 2.5rem;
    }
`;

const RadioInput = styled.input`
    display: none;

`;

const RadioLabel = styled.label`
    font-size: 1.6rem;
    cursor: pointer;
    position: relative;
    padding-left: 4.5rem;
`;

const RadioButton = styled.span`
    height: 3rem;
    width: 3rem;
    border: 5px solid var(--color-brand-700);
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 0;
    top: -0.4rem;

    &::after {
        content: '';
        display: block;
        height: 1.3rem;
        width: 1.3rem;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--color-brand-700);
        opacity: 0;
        transition: opacity 0.2s;
    }

    ${RadioInput}:checked ~ ${RadioLabel} &::after {
        opacity: 1;
    }
`;

const UserTypeCard = ({onUserTypeChange}) => {
    const handleUserTypeSelection = (selectedUserType) => {
        console.log('Selected User Type in Child:', selectedUserType);
        onUserTypeChange(selectedUserType);
    };
    return (
        <Container>
            <Heading style={{padding: '0 2rem'}}>Choose Your Role
            </Heading>
            <Card>
                <div>
                    <RadioInput type="radio" name="size" id="clinic" onChange={() => handleUserTypeSelection("clinic")}/>
                    <RadioLabel htmlFor="clinic">
                        <RadioButton />
                    </RadioLabel>
                </div>
                <Info>
                    <Icon>
                        <FaHouseMedical/>
                    </Icon>
                    <Heading type="h2">Clinic</Heading>
                    <p>Welcome to our clinic portal. Manage appointments, access medical records, and more.</p>
                </Info>
            </Card>
            <Card>
                <div>
                    <RadioInput type="radio" name="size" id="doctor" onChange={() => handleUserTypeSelection("doctor")}/>
                    <RadioLabel htmlFor="doctor">
                        <RadioButton />
                    </RadioLabel>
                </div>
                <Info>
                    <Icon>
                        <FaUserDoctor/>
                    </Icon>
                    <Heading type="h2">Doctor</Heading>
                    <p>Enhance patient care and streamline practice management. Manage appointments, access patient records.</p>
                </Info>
            </Card>

            <Card>
                <div>
                    <RadioInput type="radio" name="size" id="patient" onChange={() => handleUserTypeSelection("patient")}/>
                    <RadioLabel htmlFor="patient">
                        <RadioButton />
                    </RadioLabel>
                </div>
                <Info>
                    <Icon>
                        <FaHospitalUser/>
                    </Icon>
                    <Heading type="h2">Patient</Heading>
                    <p>Take control of your healthcare. Schedule appointments, track medical history, and connect with
                        doctors.</p></Info>
            </Card>
            <Card>
                <div>
                    <RadioInput type="radio" name="size" id="receptionist" onChange={() => handleUserTypeSelection("receptionist")}/>
                    <RadioLabel htmlFor="receptionist">
                        <RadioButton />
                    </RadioLabel>
                </div>
                <Info>
                    <Icon>
                        <FaUserPen/>
                    </Icon>
                    <Heading type="h2">Receptionist</Heading>
                    <p>Efficiently manage clinic operations. Schedule appointments, assist patients, and support
                        healthcare providers.</p></Info>
            </Card>
        </Container>
    );
};

export default UserTypeCard;
