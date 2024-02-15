import React, {useEffect, useState} from 'react';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useSettings} from "./useSettings.js";
import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner.jsx";
import {useUpdateSettings} from "./useUpdateSettings.js";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {HiChevronDown, HiChevronRight} from "react-icons/hi2";
import Row from "../../ui/Row.jsx";
import styled from "styled-components";

const animatedComponents = makeAnimated();
const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono", sans-serif;
`;

const Card = styled.div`
    cursor: pointer;
    background-color: var(--color-grey-0);
    border-radius: 9px;
    padding: 2.4rem 4rem;
`

function UpdateSettingsForm() {
    const {isLoading, settings: settingsData} = useSettings();
    const {isUpdating, updatedSettings} = useUpdateSettings();

    const [selectedMorningDoctors, setSelectedMorningDoctors] = useState(null);
    const [selectedAfternoonDoctors, setSelectedAfternoonDoctors] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // State to control accordion open/close

    // Toggle accordion state
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        setSelectedMorningDoctors(settingsData?.morningDoctors?.map(doctor => ({
            value: doctor.doctorId,
            label: doctor.doctorName
        })));
        setSelectedAfternoonDoctors(settingsData?.afternoonDoctors?.map(doctor => ({
            value: doctor.doctorId,
            label: doctor.doctorName
        })));
    }, [settingsData]);

    if (isLoading) return <Spinner/>;


    function handleUpdate(e, field, doctors, filtered) {
        let value;
        if (field === "morningDoctors") {
            value = {
                "morningDoctors": doctors?.map(doc => ({doctorId: doc.value, doctorName: doc.label})),
                "afternoonDoctors": filtered?.map(doc => ({doctorId: doc.value, doctorName: doc.label})) ?? []
            };

        } else if (field === "afternoonDoctors") {
            value = {
                "morningDoctors": filtered?.map(doc => ({doctorId: doc.value, doctorName: doc.label})) ?? [],
                "afternoonDoctors": doctors?.map(doc => ({doctorId: doc.value, doctorName: doc.label}))
            };
        } else {
            value = {
                [field]: e.target.value
            }
        }

        if (!value || typeof settingsData.id === 'undefined') return;


        const updatedSettingsData = {
            ...settingsData,
            ...value
        };
        updatedSettings(updatedSettingsData);
    }

    // Prepare options for the morning and afternoon doctors
    const morningDoctorOptions = Array.isArray(settingsData?.morningDoctors) ? settingsData?.morningDoctors
        .filter(doctor => !selectedAfternoonDoctors?.some(selected => selected.value === doctor.doctorId))
        .map(doctor => ({value: doctor.doctorId, label: doctor.doctorName})) : [];

    const afternoonDoctorOptions = Array.isArray(settingsData?.afternoonDoctors) ? settingsData?.afternoonDoctors
        .filter(doctor => !selectedMorningDoctors?.some(selected => selected.value === doctor.doctorId))
        .map(doctor => ({value: doctor.doctorId, label: doctor.doctorName})): [];
    const allDoctorOptions = settingsData ? [...morningDoctorOptions, ...afternoonDoctorOptions] : [];

    // Handlers for updating selected doctors
    const handleMorningDoctorChange = (selectedOptions) => {
        // Remove the selected doctors from the afternoon slot
        const filteredAfternoonDoctors = selectedAfternoonDoctors.filter(
            (doctor) => !selectedOptions.some((selected) => selected.value === doctor.value)
        );
        setSelectedAfternoonDoctors(filteredAfternoonDoctors);

        // Update the selected morning doctors
        setSelectedMorningDoctors(selectedOptions);

        handleUpdate(null, 'morningDoctors', selectedOptions)
    };

    const handleAfternoonDoctorChange = (selectedOptions, filter) => {
        // Remove the selected doctors from the morning slot

        const filteredMorningDoctors = selectedMorningDoctors.filter(
            (doctor) => !selectedOptions.some((selected) => selected.value === doctor.value)
        );
        setSelectedMorningDoctors(filteredMorningDoctors);

        // Update the selected afternoon doctors
        setSelectedAfternoonDoctors(selectedOptions);

        handleUpdate(null, 'afternoonDoctors', selectedOptions)
    };
    return (
        <>
            <Card onClick={toggleAccordion}>
                <Row type="horizontal">
                    <Title>Settings</Title>
                    {isOpen ? <HiChevronDown/> : <HiChevronRight/>}
                </Row>
            </Card>

            {isOpen && (<Form>
                <FormRow label='Morning Start Time'>
                    <Input type='time' id='morning-start-time' disabled={isUpdating}
                           defaultValue={settingsData?.morningStartTime}
                           onBlur={e => handleUpdate(e, 'morningStartTime')}/>
                </FormRow>
                <FormRow label='Morning End Time'>
                    <Input type='time' id='morning-end-time' disabled={isUpdating}
                           defaultValue={settingsData?.morningEndTime} onBlur={e => handleUpdate(e, 'morningEndTime')}/>
                </FormRow>
                <FormRow label='Afternoon Start Time'>
                    <Input type='time' id='afternoon-start-time' disabled={isUpdating}
                           defaultValue={settingsData?.afternoonStartTime}
                           onBlur={e => handleUpdate(e, 'afternoonStartTime')}/>
                </FormRow>
                <FormRow label='Afternoon End Time'>
                    <Input type='time' id='afternoon-end-time' disabled={isUpdating}
                           defaultValue={settingsData?.afternoonEndTime}
                           onBlur={e => handleUpdate(e, 'afternoonEndTime')}/>
                </FormRow>
                <FormRow label='Appointment Duration (minutes)'>
                    <Input type='number' id='appointment-duration' disabled={isUpdating}
                           defaultValue={settingsData?.appointmentDurationMinutes}
                           onBlur={e => handleUpdate(e, 'appointmentDurationMinutes')}/>
                </FormRow>
                <FormRow label='Days to Generate'>
                    <Input type='number' id='days-to-generate' disabled={isUpdating}
                           defaultValue={settingsData?.daysToGenerate} onBlur={e => handleUpdate(e, 'daysToGenerate')}/>
                </FormRow>

                <FormRow label="Morning Doctors">
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={allDoctorOptions}
                        value={selectedMorningDoctors}
                        onChange={handleMorningDoctorChange}

                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: base => ({...base, zIndex: 9999}),
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                border: '1px solid var(--color-grey-300)',
                                borderRadius: 'var(--border-radius-sm)',
                                padding: '0.2rem .2rem',
                                boxShadow: 'var(--shadow-sm)',
                                backgroundColor: 'var(--color-grey-0)',
                                color: 'var(--color-grey-600)'
                            }),
                            option: (base, state) => ({
                                ...base,
                                color: state.isFocused || state.isSelected ? 'white' : 'var(--color-grey-600)',
                            })
                        }}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,

                            colors: {
                                ...theme.colors,
                                primary25: 'var(--color-brand-600)',
                                primary: 'var(--color-brand-700)',
                                neutral0: 'var(--color-grey-0)', // Background color
                                neutral80: 'var(--color-grey-600)', // Text color
                            },
                        })}/>
                </FormRow>

                <FormRow label="Afternoon Doctors">
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={allDoctorOptions}
                        value={selectedAfternoonDoctors}
                        onChange={handleAfternoonDoctorChange}
                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: base => ({...base, zIndex: 9999}),
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                border: '1px solid var(--color-grey-300)',
                                borderRadius: 'var(--border-radius-sm)',
                                padding: '0.2rem .2rem',
                                boxShadow: 'var(--shadow-sm)',
                                backgroundColor: 'var(--color-grey-0)',
                                color: 'var(--color-grey-600)'
                            }),
                            option: (base, state) => ({
                                ...base,
                                color: state.isFocused || state.isSelected ? 'white' : 'var(--color-grey-600)',
                            })
                        }}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,

                            colors: {
                                ...theme.colors,
                                primary25: 'var(--color-brand-600)',
                                primary: 'var(--color-brand-700)',
                                neutral0: 'var(--color-grey-0)', // Background color
                                neutral80: 'var(--color-grey-600)', // Text color
                            },
                        })}/>
                </FormRow>
            </Form>)}
        </>
    );
}

export default UpdateSettingsForm;
