import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {HiArrowDown, HiChevronDown, HiChevronRight} from 'react-icons/hi2';
import {useSearchParams} from "react-router-dom";
import Input from "./Input.jsx";
import {useOutsideClick} from "../hooks/useOutsideClick.js";

const StyledDropdown = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    font-size: 1.4rem;
    padding: 1.1rem 1.3rem;
    border: 1px solid ${(props) =>
            props.type === "white"
                    ? "var(--color-grey-100)"
                    : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

const DropdownResetButton = styled.button`
    font-size: 1.4rem;
    padding: 0.6rem 0.9rem;
    border: 1px solid ${(props) =>
            props.type === "white"
                    ? "var(--color-grey-100)"
                    : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

const DropdownContent = styled.div`
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    position: absolute;
    background-color: var(--color-grey-50);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    min-width: 160px;
    padding: 12px;
`;

const FieldParagraph = styled.p`
    font-weight: bold;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 8px;
`;

const StyledLabel = styled.div`

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: space-between;
`

const StyledServiceContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 20px; // Adjust the indentation based on your preference
`;

const SelectMultiple = ({options, types}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedServices, setSelectedServices] = useState({});
    const [openStates, setOpenStates] = useState({});
    const dropdownRef = useOutsideClick(() => setIsOpen(false));

    useEffect(() => {
        // Retrieve selected options from searchParams on component mount
        const specializationParam = searchParams.get('specialization');
        if (specializationParam) {
            const selectedSpecializations = specializationParam.split(',');
            setSelectedOptions(
                selectedSpecializations.reduce((acc, spec) => {
                    acc[spec] = spec;
                    return acc;
                }, {})
            );
        }

        const serviceParam = searchParams.get('service');
        if (serviceParam) {
            const selectedServicesList = serviceParam.split(',');
            setSelectedServices(
                selectedServicesList.reduce((acc, service) => {
                    acc[service] = service;
                    return acc;
                }, {})
            );
        }
    }, [searchParams]);

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const handleClick = (field, value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (selectedOptions[value]) {
            newSearchParams.delete(field);
            setSelectedOptions((prevSelectedOptions) => {
                const updatedOptions = {...prevSelectedOptions};
                delete updatedOptions[value];
                return updatedOptions;
            });
            const selectedServicesUpdated = {...selectedOptions, [value]: value};
            delete selectedServicesUpdated[value];

            isEmpty(selectedServicesUpdated) ? newSearchParams.delete(field) : newSearchParams.set(field, Object.keys(selectedServicesUpdated).map(s => s));
        } else {

            const selectedServicesUpdated = {...selectedOptions, [value]: value};
            setSelectedOptions({...selectedOptions, [value]: value});
            newSearchParams.set(field, Object.keys(selectedServicesUpdated).map(s => s));


        }
        setSearchParams(newSearchParams);
    };

    const handleClickService = (field, value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (selectedServices[value]) {
            newSearchParams.delete(field);
            setSelectedServices((prevSelectedServices) => {
                const updatedServices = {...prevSelectedServices};
                delete updatedServices[value];
                return updatedServices;
            });
            const selectedServicesUpdated = {...selectedServices, [value]: value};
            delete selectedServicesUpdated[value];
            isEmpty(selectedServicesUpdated) ? newSearchParams.delete(field) : newSearchParams.set(field, Object.keys(selectedServicesUpdated).map(s => s));
        } else {
            setSelectedServices({...selectedServices, [value]: value});
            const selectedServicesUpdated = {...selectedServices, [value]: value};
            newSearchParams.set(field, Object.keys(selectedServicesUpdated).map(s => s));

        }
        setSearchParams(newSearchParams);
    };

    const toggleOption = (field, value) => {
        setOpenStates((prevOpenStates) => ({
            ...prevOpenStates,
            [`${field}-${value}`]: !prevOpenStates[`${field}-${value}`],
        }));
    };

    const resetFilter = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("specialization");
        newSearchParams.delete("service");

        setSearchParams(newSearchParams);
        setSelectedOptions({});
        setSelectedServices({});
        setOpenStates({});
    };

    return (
        <StyledDropdown ref={dropdownRef}>
            <DropdownButton onClick={() => setIsOpen(!isOpen)}>Filter <HiArrowDown/> </DropdownButton>
            <DropdownContent isOpen={isOpen}>
                {Object.keys(options).map((field) => (
                    <div key={field}>
                        <FieldParagraph>{options[field].field}</FieldParagraph>
                        {options[field].optionsFiled.map((option, index) => (
                            <StyledLabel key={option.value}>
                                <CheckboxLabel>
                                    <Input
                                        type="checkbox"
                                        checked={selectedOptions[option.value] === option.value}
                                        onChange={() => handleClick('specialization', option.value)}
                                    />
                                    {option.label || option}
                                </CheckboxLabel>
                                {types === "clinics" &&
                                    <>
                                        <div key={index} onClick={() => toggleOption(field, option.value)}
                                             style={{justifySelf: 'end'}}>
                                            {openStates[`${field}-${option.value}`] ? <HiChevronDown/> :
                                                <HiChevronRight/>}
                                        </div>
                                        <div style={{marginLeft: '3rem'}}>
                                            {openStates[`${field}-${option.value}`] &&
                                                option.services && (
                                                    <div>
                                                        {option.services.map((o) => (
                                                            <CheckboxLabel key={o.value + 10 || o}>
                                                                <Input
                                                                    type="checkbox"
                                                                    checked={selectedServices[o.value] === o.value}
                                                                    onChange={() => handleClickService('service', o.value)}
                                                                />
                                                                {o.label || o}
                                                            </CheckboxLabel>
                                                        ))}
                                                    </div>
                                                )}
                                        </div>
                                    </>
                                }
                            </StyledLabel>
                        ))}
                    </div>
                ))}
                <DropdownResetButton onClick={resetFilter}>Reset filter</DropdownResetButton>
            </DropdownContent>
        </StyledDropdown>
    );
};

export default SelectMultiple;