import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import MedicalReportTable from "../features/MedicalReport/MedicalReportTable.jsx";
import AddMedicalReport from "../features/MedicalReport/AddMedicalReport.jsx";
import MedicalReportTableOperations from "../features/MedicalReport/MedicalReportTableOperations.jsx";
import SearchInput from "../ui/SearchInput.jsx";
import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";

const MedicalReport = () => {
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
                <Heading as="h1">All medical reports</Heading>

                <Row type="horizontal" style={{gap: '3rem'}}>
                    <SearchInput value={searchInput} onChange={handleSearchInputChange}/>
                    <MedicalReportTableOperations/>
                </Row>


            </Row>

            <Row>
                <MedicalReportTable/>
                <AddMedicalReport/>
            </Row>
        </>
    );
};

export default MedicalReport;