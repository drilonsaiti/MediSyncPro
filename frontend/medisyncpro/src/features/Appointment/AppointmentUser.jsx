import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useClinics} from "../Clinic/useClinic.js";
import Button from "../../ui/Button.jsx";
import Heading from "../../ui/Heading.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateAppointmentForm from "./CreateAppointmentForm.jsx";
import Spinner from "../../ui/Spinner.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import AppointmentUserTableOperations from "./AppointmentUserTableOperations.jsx";
import SearchInput from "../../ui/SearchInput.jsx";
import Row from "../../ui/Row.jsx";
import Pagination from "../../ui/Pagination.jsx";
import ClinicDoctorsBox from "../Clinic/ClinicDoctorsBox.jsx";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: stretch; /* Ensures all items stretch to the same height */
    background-color: var(--color-grey-0);;
    padding: 2rem;
    gap: 2rem;
    grid-auto-rows: 1fr; /* Set each row to have equal height */
    z-index: 201;
`;

const StyledBoxDoctors = styled.div`
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-0);
    border-radius: 7px;
    padding: 2rem;
    z-index: 200;
`;

const ProfileCard = styled.div`
    display: grid;
    grid-template-rows: repeat(2,1fr) 20%;
    gap: 1rem;
    //justify-items: center;
    text-align: center;
    background-color: var(--color-grey-0);
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    padding: 2rem;
    transition: transform 0.3s ease;

    &:hover {
        background: linear-gradient(to left top, rgba(16, 65, 47, .05) 0% , var(--hover-clinic-color) 50% , rgba(16, 65, 47, .1) 100% ),
        linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)) 
    }
`;


const ButtonWrapper = styled.div`
    grid-column: 1 / -1;
`;


const Avatar = styled.div`
    border-radius: 50%;
    width: 7rem;
    height: 7rem;
    outline: 1px solid rgba(16, 65, 47, 0.3);
    box-sizing: border-box;
    padding: 2px;
    position: relative;
    z-index: 101;
`;

const AvatarOverlay = styled.div`
    position: absolute;
    content: "";
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    border: 1px solid rgba(16, 65, 47, .2);
    z-index: 1;
`;

const AvatarOuterBorder = styled.div`
    position: absolute;
    content: "";
    top: -11px;
    left: -11px;
    right: -11px;
    bottom: -11px;
    border-radius: 50%;
    border: 1px solid rgba(16, 65, 47, .1);
    z-index: 1;
`;

const AvatarImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    z-index: 100;
`;

const P = styled.p`
    color: var(--color-grey-400);
    font-size: 1.4rem;
`;

const FlexGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    align-items: center;
    text-align: left;
    justify-content: space-between;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Info = styled.div`
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: center;
`;

const Tooltip = styled.span.attrs(props => ({
    'data-specialization-id': props.specializationId,
    'service-dto': props.serviceDto
}))`
    position: relative;
    cursor: pointer;

    &:hover::after {
        content: "${props => getServiceText(props.specializationId, props.serviceDto)}";
        position: absolute;
        bottom: calc(100% + 5px);
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        z-index: 9999;
        display: flex;
        flex-direction: column; 
        gap: 5px;
        white-space: nowrap;
        
    }
`;

const Footer = styled.footer`
    height: 20lvh;
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const getServiceText = (specializationId, serviceDto) => {
    const specializationServices = serviceDto?.filter(service => service.specializationId === specializationId);

    if (specializationServices.length === 0) {
        return '';
    }

    const services = specializationServices?.map(service => service.services.split(", ")).flat();
    const maxServicePerLine = 2;
    const chunks = [];

    for (let i = 0; i < services.length; i += maxServicePerLine) {
        chunks.push(services.slice(i, i + maxServicePerLine).join(', '));
    }

    const displayedServices = chunks.slice(0, 2).join(', ');

    if (chunks.length > 2) {
        return displayedServices + ', and more...';
    } else {
        return displayedServices;
    }
};

const AppointmentUser = () => {
    const {isLoading, clinics, totalElements} = useClinics();
    const [searchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState('');
    const [types, setTypes] = React.useState('clinic');
    const navigate = useNavigate();

    useEffect(() => {
        const searchTypes = searchParams.get('types');
        if (searchTypes) {
            setTypes(searchTypes);
        }
    }, [searchParams]);


    if (isLoading) return <Spinner/>;

    const handleSearchInputChange = (event) => {
        event === '' ? setSearchInput('') :
            setSearchInput(event.target.value);
    };

    const filteredClinics = clinics?.filter((clinic) => {
        const searchField = types === 'clinics' ? clinic.clinicName : 'unknown';
        return searchField.toLowerCase().includes(searchInput.toLowerCase());
    });


    return (
        <StyledBoxDoctors>
            <Row type="horizontal" change="yes">
                <Heading as="h1">Search and make appointment</Heading>
                <Row type="horizontal" style={{gap: '3rem'}}>
                    <SearchInput value={searchInput} onChange={handleSearchInputChange}/>
                    <AppointmentUserTableOperations types={types}/>
                </Row>
            </Row>

            {types === "doctors" ? <ClinicDoctorsBox value={searchInput}/> :
                <Container>
                    {filteredClinics?.map(clinic => (
                        <ProfileCard key={clinic.clinicId}>
                            <Header>
                                <Avatar>
                                    <AvatarImg src="http://localhost:5173/logo.png"/>
                                    <AvatarOverlay/>
                                    <AvatarOuterBorder/>
                                </Avatar>
                                <Heading type="h3">{clinic.clinicName}</Heading>
                                <ButtonWrapper>
                                    <Button variation="secondary" size="small"
                                            onClick={() => navigate(`/clinics/${clinic.clinicId}`)}>View
                                        Profile</Button>
                                </ButtonWrapper>
                            </Header>
                            <FlexGroup>
                                <div style={{justifySelf: "start"}}>
                                    <Heading type="h4">Work hours</Heading>
                                    <Heading type="h4">Morning hours: {clinic.morningHours}</Heading>
                                    <Heading type="h4">Afternoon hours: {clinic.afternoonHours}</Heading>
                                </div>

                                <div style={{justifySelf: "end"}}>
                                    <Heading type="h4">Services Offered</Heading>
                                    {clinic.specializations.map((spec, index) => (
                                        <Tooltip key={index} specializationId={spec.specializationId}
                                                 serviceDto={clinic.serviceDto}>
                                            <P>{spec.specializationName}</P>
                                        </Tooltip>

                                    ))}
                                </div>
                            </FlexGroup>
                            <Modal >
                                <Modal.Open opens="appointment">
                                    <Button size="medium">Make Appointment</Button>
                                </Modal.Open>

                                <Modal.Window name="appointment" overFlowVisible={true}>
                                    <CreateAppointmentForm clinicId={clinic.clinicId}/>
                                </Modal.Window>
                            </Modal>

                        </ProfileCard>
                    ))}


                </Container>
            }
            {
                types === "clinics" && <Footer>
                    <Pagination count={totalElements}/>
                </Footer>
            }

        </StyledBoxDoctors>
    );
};

export default AppointmentUser;
