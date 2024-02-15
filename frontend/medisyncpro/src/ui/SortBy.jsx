import Select from "./Select.jsx";
import SelectMultiple from "./SelectMultiple.jsx";
import {useSearchParams} from "react-router-dom";


const SortBy = ({options, type, types}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get("sortBy") || "";
    const handleChange = (e) => {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }

    return (
        type === "checkbox" ? <SelectMultiple type="white" types={types} options={options}/> :
            <Select options={options} onChange={handleChange} type="white"/>
    );
};

export default SortBy;