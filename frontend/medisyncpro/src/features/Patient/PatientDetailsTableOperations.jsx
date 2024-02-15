import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";

const PatientDetailsTableOperations = () => {
    const optionsTypes = [
        {value: 'calendar', label: "Calendar"},
        {value: 'all', label: "All appointments"},
    ]

    return (
        <TableOperations>
            <Filter filterField='types' options={optionsTypes}/>
        </TableOperations>


    )
        ;
};

export default PatientDetailsTableOperations;