import Spinner from "../../ui/Spinner.jsx";
import Row from "../../ui/Row.jsx";
import {HiChevronDown, HiChevronRight} from "react-icons/hi2";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Select from "react-select";
import {useReceptionistByClinicId, useReceptionistSearch} from "../Receptionist/useReceptionist.js";
import makeAnimated from 'react-select/animated';
import ReceptionistTable from "../Receptionist/ReceptionistTable.jsx";
import styled from "styled-components";
import {useState} from "react";
import {useAddReceptionistToClinic} from "../Receptionist/useAddReceptonistToClinic.js";

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
const AccountReceptionistSettings = () => {
    const {isLoading: isLoadingSearch, receptionistsOptions} = useReceptionistSearch();
    const {isLoading, receptionists} = useReceptionistByClinicId();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReceptionists, setSelectedReceptionists] = useState([]);
    const [selectedOptionsText, setSelectedOptionsText] = useState([]);
    const {isCreating, addReceptionist} = useAddReceptionistToClinic();

    if (isLoading || isLoadingSearch) return <Spinner/>;

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const options = receptionistsOptions?.map(receptionist => ({
        value: receptionist.email,
        label: `${receptionist.email} - ${receptionist.name}`
    }));

    const handleSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions?.map(option => option.value) || [];
        setSelectedReceptionists(selectedValues);
        setSelectedOptionsText(selectedOptions);
    };

    const handlerBlurSelect = () => {
        const data = selectedReceptionists.map(receptionist => {
            return {
                email: receptionist
            }
        })

        if (selectedReceptionists.length > 0)
            addReceptionist(data, {
                onSuccess: () => {
                    setSelectedReceptionists([]);
                    setSelectedOptionsText([]);
                },
            })
    };

    return (
        <Row>
            <Card onClick={toggleAccordion}>
                <Row type="horizontal">
                    <Title>Add/Remove receptionists</Title>
                    {isOpen ? <HiChevronDown/> : <HiChevronRight/>}
                </Row>
            </Card>

            {isOpen && (
                <Row>
                    <Form>
                        <FormRow label="Add receptionist to your clinic" style={{position: 'relative'}}>
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isSearchable
                                isMulti
                                options={options}
                                onChange={handleSelectChange}
                                onBlur={handlerBlurSelect}
                                closeOnSelect={false}
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
                                        color: 'var(--color-grey-600)',
                                        width: '150%'
                                    }),
                                    multiValue: (base) => ({
                                        ...base,
                                        border: '1px solid var(--color-grey-100)',
                                        backgroundColor: 'transparent',
                                        borderRadius: '9px',
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
                                })}
                                value={selectedOptionsText} // Pass the selectedOptionsText state to control the selected text
                            />
                        </FormRow>
                    </Form>
                    <ReceptionistTable receptionistsByClinic={receptionists} forClinic/>
                </Row>
            )}
        </Row>
    );
};


export default AccountReceptionistSettings;