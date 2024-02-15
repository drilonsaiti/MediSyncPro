import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";
import {useSpecializations} from "../Specializations/useSpecializations.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";


const ServiceTableOperations = () => {
    const {isLoading, specializations} = useSpecializations();

    if (isLoading) return <SpinnerMini/>

    const allSpecializations = Array.isArray(specializations) ? specializations?.sort((a, b) => a.specializationId - b.specializationId) : [];

    const optionsSpecializations = allSpecializations?.map(spec => {
        return {
            value: spec.specializationName,
            label: spec.specializationName,
        }
    })
    const options = {
        specialization: {
            field: "Specializations",
            optionsFiled: optionsSpecializations
        },
    }

    const optionsSort = [
        {value: 'name-asc', label: "Sort by name (A-Z)"},
        {value: 'name-desc', label: "Sort by name (Z-A)"},
        {value: 'price-asc', label: "Sort by price low to high"},
        {value: 'price-desc', label: "Sort by price high to low"},
        {value: 'duration-asc', label: "Sort by duration low to high"},
        {value: 'duration-desc', label: "Sort by duration high to low"},
    ]
    return (
        <TableOperations>
            <SortBy type="checkbox" filterField='discount' options={options}/>
            <SortBy options={optionsSort}/>
        </TableOperations>


    )
        ;
};

export default ServiceTableOperations;