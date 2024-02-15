import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import PatientTable from "../features/Patient/PatientTable.jsx";
import AddPatient from "../features/Patient/AddPatient.jsx";
import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
import SearchInput from "../ui/SearchInput.jsx";

const Patient = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSearchInputChange = (event) => {
        const newSearchParam = new URLSearchParams(searchParams);
        event === '' ? setSearchInput('') :
            setSearchInput(event.target.value);
        newSearchParam.set('nameOrEmail', event.target.value)
        setSearchParams(newSearchParam);
    };
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All patients</Heading>
                <SearchInput value={searchInput} onChange={handleSearchInputChange}/>

            </Row>

            <Row>
                <PatientTable/>
                <AddPatient/>
            </Row>
        </>
    );
};

export default Patient;