import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";


const ClinicScheduleTableOperations = () => {

    const optionsSort = [
        {value: 'startDate-asc', label: "Sort by date (A-Z)"},
        {value: 'startDate-desc', label: "Sort by date (Z-A)"},

    ]
    return (
        <TableOperations>
            <SortBy options={optionsSort}/>
        </TableOperations>


    )
        ;
};

export default ClinicScheduleTableOperations;