import styled from "styled-components";
import {HiAtSymbol} from "react-icons/hi2";
import Heading from "../../ui/Heading.jsx";
import {FaAtom, FaCalendarCheck, FaClipboardList, FaEnvelope, FaGraduationCap} from "react-icons/fa";
import {FaHouseMedical} from "react-icons/fa6";


export const StyledBox = styled.div`
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-50);
    border-radius: 7px;
    width: 80%;
    overflow: hidden;
    margin: auto;
    
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr max-content;
    gap: 4rem;
    justify-content: space-around;
    align-items: center;

    padding: 4.5rem 5.4rem;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`

const HeaderProfile = styled.div`
    padding: 2rem 4rem;
    color: #fff;
    font-size: 1.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    background-color: #087f5b;
    margin: auto;
`

const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-self: start;
    margin-top: 2rem;
`

const ContactItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    gap: 2.5rem;

    & svg {
        width: 2.4rem;
        height: 2.4rem;
    }
`

const QuickActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: var(--color-grey-800);
    color: white;
    border-radius: 20px;
    padding: 1rem 2rem;
`
const QuickActionsButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    background-color: #087f5b;
    color: white;
    font-family: Arial, sans-serif;
    font-size: 16px;
    padding: 10px;
    margin: 10px;
    border: none;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        background-color: var(--color-primary-900);
    }
    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: white;
        transition: all 0.3s;
    }
`

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Sono",sans-serif;
`;

const Avatar = styled.div`
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-top: 20px;
    overflow: hidden;
    border: 1px solid var(--color-grey-0);;
    box-sizing: border-box;
    padding: 2px;
`;

const AvatarImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

const ClinicHeaderBox = ({clinic}) => {
    const {clinicId, clinicName: name, specializations, address, doctors} = clinic;

    return (
        <StyledBox>

            <Container>
                <HeaderProfile>
                    <Avatar>
                        <AvatarImg src="http://localhost:5173/logo.png"/>
                    </Avatar>
                    <Heading type="h1">{name}</Heading>
                    <Title>Clinic</Title>
                </HeaderProfile>
                <ContactInfo>
                    <Heading type="h2">Info</Heading>
                    <ContactItem type="lg">
                        <FaAtom/>

                        <p>{specializations?.map(spec =>
                            (<span key={spec.specializationId}>{`${spec.specializationName},`}</span>))}
                        </p>
                    </ContactItem>
                    <ContactItem type="lg">
                        <FaGraduationCap/>
                        <p>{address}</p>
                    </ContactItem>
                    <ContactItem type="lg">
                        <FaHouseMedical/>
                        <p>{clinic.clinicName}</p>
                    </ContactItem>

                    <ContactItem type="lg">
                        <FaClipboardList/>
                        <p>{doctors?.length ?? 0}</p>
                    </ContactItem>
                </ContactInfo>

                <ContactInfo>
                    <Heading type="h2">Contact info</Heading>
                    <ContactItem>
                        <HiAtSymbol/>
                        <p>test@test.com</p>
                    </ContactItem>
                </ContactInfo>


                <QuickActions>
                    <Heading type="h3">Quick actions</Heading>

                    <QuickActionsButton>
                        <FaEnvelope/>
                        Send Message
                    </QuickActionsButton>
                    <QuickActionsButton>
                        <FaCalendarCheck/>
                        Appointment
                    </QuickActionsButton>
                </QuickActions>
            </Container>
        </StyledBox>
    );
};

export default ClinicHeaderBox;