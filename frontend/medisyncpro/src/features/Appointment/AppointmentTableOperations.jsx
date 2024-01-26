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

    /*const optionsSort = [
        {value: 'name-asc', label: "Sort by name (A-Z)"},
        {value: 'name-desc', label: "Sort by name (Z-A)"},
        {value: 'regularPrice-asc', label: "Sort by price low to high"},
        {value: 'regularPrice-desc', label: "Sort by price high to low"},
        {value: 'maxCapacity-asc', label: "Sort by capacity low to high"},
        {value: 'maxCapacity-desc', label: "Sort by capacity high to low"},
    ]*/
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