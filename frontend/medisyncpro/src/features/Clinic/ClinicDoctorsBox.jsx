import styled from "styled-components";
import Button from "../../ui/Button.jsx";
import Heading from "../../ui/Heading.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateAppointmentForm from "../Appointment/CreateAppointmentForm.jsx";
import React from "react";
import {useDoctors} from "../Doctor/useDoctors.js";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";
import {useNavigate} from "react-router-dom";


const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    align-items: center;
    background-color: var(--color-grey-0);;
    padding: 2rem;

`;

const StyledBoxDoctors = styled.div`

    width: 80%;
    overflow: hidden;
    margin: auto;
    padding: 2rem;

`

const ProfileCard = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    gap: 1rem;
    height: auto;
    background-color: white;
    border: 1px solid var(--color-brand-700);
    /*border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);*/

    padding: 2rem 2rem;
    transition: transform 0.3s ease;

    &:hover {
        background: linear-gradient(to left top, rgba(16, 65, 47, .05) 0% /*bottom-right color*/, rgba(255, 255, 255, 1) 50% /*middle color*/, rgba(16, 65, 47, .1) 100% /*top-left color*/),
        linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)) /*"faked" black background make sure to add last or it will appear before the transparent/colored layer*/;
    }
`;

const Avatar = styled.div`
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
    margin-top: 2rem;
    overflow: hidden;
    border: 1px solid var(--color-brand-700);;
    box-sizing: border-box;
    padding: 2px;
`;

const AvatarImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

const Status = styled.div`
    position: absolute;
    top: 27%;
    right: 39%;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid white;
    transform: translate(-50%, -30%);
    background-color: var(--color-brand-700);
`;

const P = styled.p`
    color: var(--color-grey-400);
    font-size: 1.4rem;
`

const FlexGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Footer = styled.footer`
    height: 20lvh;
    display: flex;
    justify-content: center;
    padding: 1.2rem;

    &:not(:has(*)) {
        display: none;
    }
`;

const ClinicDoctorsBox = ({value}) => {
    const {doctors, isLoading, totalElements} = useDoctors()
    const navigate = useNavigate();

    if (isLoading) return <Spinner/>

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.doctorName.toLowerCase().includes(value.toLowerCase())
    ).filter(doctor => doctor.clinic !== null);


    return (
        <StyledBoxDoctors>
            <Container>
                {
                    filteredDoctors?.map(doctor => (
                        <ProfileCard key={doctor.doctorId}>
                            <Button variation="secondary" size="small"
                                    onClick={() => navigate(`/doctors/${doctor.doctorId}`)}
                                    style={{alignSelf: "self-end", marginTop: "1rem"}}>view profile</Button>
                            <Avatar>
                                <AvatarImg src="http://localhost:5173/michele.jpg"/>
                            </Avatar>
                            <Status/>
                            <FlexGroup>
                                <Heading type="h3">{doctor.doctorName}</Heading>
                                <P style={{fontWeight: "bold"}}>{doctor.clinic?.clinicName ?? ''}</P>
                                <P>{doctor.specialization.specializationName}</P>

                            </FlexGroup>
                            {doctor.clinic &&
                                <Modal>

                                    <Modal.Open opens="appointment">
                                        <Button size="medium">Make Appointment</Button>
                                    </Modal.Open>

                                    <Modal.Window name="appointment">
                                        <CreateAppointmentForm clinicId={doctor.clinic?.clinicId ?? ''}
                                                               doctorId={doctor.doctorId} doctorName={doctor.doctorName}
                                                               clinicName={doctor.clinic?.clinicName}/>
                                    </Modal.Window>
                                </Modal>
                            }
                        </ProfileCard>
                    ))
                }

            </Container>
            <Footer>
                <Pagination count={totalElements}/>
            </Footer>
        </StyledBoxDoctors>
    );
};

export default ClinicDoctorsBox;
