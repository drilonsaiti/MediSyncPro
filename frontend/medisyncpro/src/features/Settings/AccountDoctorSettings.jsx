import React, {useState} from 'react';
import Row from "../../ui/Row.jsx";
import {HiChevronDown, HiChevronRight} from "react-icons/hi2";
import styled from "styled-components";
import {useDoctorsByClinicId, useDoctorSearch} from "../Doctor/useDoctors.js";
import Spinner from "../../ui/Spinner.jsx";
import Form from "../../ui/Form.jsx";
import Select from "react-select";
import DoctorTable from "../Doctor/DoctorTable.jsx";
import FormRow from "../../ui/FormRow.jsx";
import makeAnimated from 'react-select/animated';
import {useAddDoctorToClinic} from "../Doctor/useAddDoctorToClinic.js";
const animatedComponents = makeAnimated();

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;


const Card = styled.div`
    cursor: pointer;
    background-color: var(--color-grey-0);
    border-radius: 9px;
    padding: 2.4rem 4rem;
`
const AccountDoctorSettings = () => {
    const { isLoading, doctors, totalElements } = useDoctorsByClinicId();
    const { isLoading: isLoadingDoctorsSearch, doctorsOptions } = useDoctorSearch();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [selectedOptionsText, setSelectedOptionsText] = useState([]);
    const {isCreating, addDoctor} = useAddDoctorToClinic();

    if (isLoading || isLoadingDoctorsSearch) return <Spinner />;

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const options = doctorsOptions?.map(doctor => ({
        value: doctor.email,
        label: `${doctor.email} - ${doctor.name}`
    }));

    const handleSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions?.map(option => option.value) || [];
        setSelectedDoctors(selectedValues);
        setSelectedOptionsText(selectedOptions);
    };

    const handlerBlurSelect = () => {

        const data = selectedDoctors.map(doctor =>{
            return {
                doctorEmail: doctor
            }
        })

        if (selectedDoctors.length > 0)
        addDoctor(data,{
            onSuccess: () => {
                setSelectedDoctors([]);
                setSelectedOptionsText([]);
            },
        })
        console.log("DATA ",data);
    };

    return (
        <Row>
            <Card onClick={toggleAccordion}>
                <Row type="horizontal">
                    <Title>Add/Remove doctors</Title>
                    {isOpen ? <HiChevronDown /> : <HiChevronRight />}
                </Row>
            </Card>

            {isOpen && (
                <Row>
                    <Form>
                        <FormRow label="Add doctor to your clinic" style={{ position: 'relative' }}>
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isSearchable
                                isMulti
                                isDisabled={isCreating}
                                options={options}
                                onChange={handleSelectChange}
                                onBlur={handlerBlurSelect}
                                closeOnSelect={false}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                value={selectedOptionsText} // Pass the selectedOptionsText state to control the selected text
                            />
                        </FormRow>
                    </Form>
                    <DoctorTable doctorsByClinic={doctors} forClinic />
                </Row>
            )}
        </Row>
    );
};

export default AccountDoctorSettings;