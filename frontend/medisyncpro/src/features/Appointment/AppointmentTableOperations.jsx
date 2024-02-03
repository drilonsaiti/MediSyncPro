import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";


const AccommodationTableOperations = () => {
    const optionsTypes = [
        {value: 'all', label: "All"},
        {value: 'today', label: "Today"},
    ]
    const options = {
        doctor: {
            field: "Doctor",
            optionsFiled: [
                {value: 'Dr.Smith', label: "Dr.Smith"},
                {value: 'Dr.James', label: "Dr.James"},
            ]
        },
    }

    return (
        <TableOperations>
            <Filter filterField='types' options={optionsTypes}/>
            <SortBy type="checkbox" filterField='discount' options={options}/>
            {/*<SortBy options={optionsSort}/>*/}
        </TableOperations>


    )
        ;
};

export default AccommodationTableOperations;