import React from 'react';
import TableOperations from "../../ui/TableOperations.jsx";
import SortBy from "../../ui/SortBy.jsx";
import {useSpecializations} from "../Specializations/useSpecializations.js";
import {useClinicServices} from "../ClinicServices/useClinicService.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

const DoctorTableOperations = () => {
    const {isLoading, specializations} = useSpecializations();
    const {isLoading: isLoadingServices, clinicServices} = useClinicServices();

    if (isLoading || isLoadingServices) return <SpinnerMini/>

    const allSpecializations = specializations.sort((a, b) => a.specializationId - b.specializationId);

    const optionsSpecializations = allSpecializations?.map(spec => {
        return {
            value: spec.specializationName,
            label: spec.specializationName,
            services: clinicServices.filter(s => s.specializations.specializationId === spec.specializationId)
                .flatMap(s => {
                    return {
                        value: s.serviceName,
                        label: s.serviceName
                    }
                })
        }
    })
    const options = {
        specialization: {
            field: "Specializations",
            optionsFiled: optionsSpecializations
        },
    }
    return (
        <TableOperations>
            <SortBy type="checkbox" filterField='discount' options={options}/>
        </TableOperations>
    );
};

export default DoctorTableOperations;