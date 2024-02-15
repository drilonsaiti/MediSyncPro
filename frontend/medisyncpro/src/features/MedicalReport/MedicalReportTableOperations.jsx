import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {createGlobalStyle} from "styled-components";
import TableOperations from "../../ui/TableOperations.jsx";
import DatePicker from "react-datepicker";
import {setHours, setMinutes} from "date-fns";
import {TbCalendarSearch} from "react-icons/tb";

const DatePickerWrapperStyles = createGlobalStyle`
    /*.date_picker{
        z-index: 9999 !important; !* Increase the z-index *!
        border: 1px solid var(--color-grey-300);
        background-color: var(--color-grey-0);
        border-radius: var(--border-radius-sm);
        padding: 0.8rem 1.2rem;
        box-shadow: var(--shadow-sm);
        display: inline-block;
        width: 28.5%;
    }*/
    
    .react-datepicker-wrapper{
        border: 1px solid var(--color-brand-700);
    }
    .react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover, .react-datepicker__month-text--selected:hover, .react-datepicker__month-text--in-selecting-range:hover, .react-datepicker__month-text--in-range:hover, .react-datepicker__quarter-text--selected:hover, .react-datepicker__quarter-text--in-selecting-range:hover, .react-datepicker__quarter-text--in-range:hover, .react-datepicker__year-text--selected:hover, .react-datepicker__year-text--in-selecting-range:hover, .react-datepicker__year-text--in-range:hover {
        background-color: var(--color-primary-900);
    }
    .react-datepicker__day--keyboard-selected{
        background-color: var(--color-primary-300);

    }
    .react-datepicker__day--keyboard-selected:hover, .react-datepicker__month-text--keyboard-selected:hover, .react-datepicker__quarter-text--keyboard-selected:hover, .react-datepicker__year-text--keyboard-selected:hover {
        background-color: var(--color-primary-300);
    }

    .react-datepicker__day:hover{
        background-color: var(--color-primary-900);
        color: var(--color-grey-0);

    }
    .react-datepicker__day {
        &--outside-month {
            color: var(--color-grey-400) !important;
            
            &:hover{
                color: var(--color-grey-0) !important;
            }
        }
    }

    .react-datepicker__input-container .react-datepicker__view-calendar-icon{
        display: flex;
        align-items: center;
        gap: 2rem;
        
    }

    .react-datepicker__calendar-icon {
        width: 1.2em;
        height: 1.2em;
    }

    .react-datepicker {
        font-size: 1.3rem !important;
    }

    .react-datepicker__current-month {
        font-size: 1.5rem !important;
    }

    .react-datepicker__header {
        padding-top: 6px !important;
    }

    .react-datepicker__navigation {
        top: 13px !important;
    }

    .react-datepicker__day-name, .react-datepicker__day {
        margin: 0.5rem !important;
    }
    .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected:hover {
        background-color: var(--color-brand-700)
    }

    .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
        background-color: var(--color-brand-700);
        color: white;
        font-weight: bold;

    }

    .react-datepicker__close-icon::after {
        background-color: var(--color-brand-700) !important;
        color: #fff;
    }

    .react-datepicker__input-container {
        display: flex !important;
        align-items: center !important;
    }
    
    .react-datepicker__calendar-icon{
        color: var(--color-brand-700) !important;
    }


    input {
        display: block;
        background-color: transparent;
        padding: 1rem 2rem;
        border: none;

        &:focus {
            outline: none;
        }
    }
`;

const MedicalReportTableOperations = () => {
    const [startDate, setStartDate] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    useEffect(() => {
        setStartDate(searchParams.get('byDate') ? new Date(searchParams.get('byDate')) : date);
    }, [])

    const handleDatePikcer = (value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        setStartDate(value);
        value !== null ? newSearchParams.set('byDate', value) : newSearchParams.delete('byDate');
        setSearchParams(newSearchParams)

    }

    return (
        <TableOperations>
            <DatePicker
                wrapperClassName='date_picker full-width'
                selected={startDate}
                onChange={handleDatePikcer}
                showTimeSelect

                minTime={setHours(setMinutes(new Date(), 0), 7)}
                maxTime={setHours(setMinutes(new Date(), 0), 19)}
                dateFormat="MMMM d, yyyy HH:mm"
                showIcon
                timeFormat="HH:mm"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                icon={<TbCalendarSearch/>}
                containerStyle={{width: '100%'}}
                isClearable
                placeholderText="Search by date"
                popperModifiers={{
                    flip: {behavior: ["bottom"]},
                    preventOverflow: {enabled: false},
                    hide: {enabled: false}
                }}
            />
            <DatePickerWrapperStyles/>
        </TableOperations>
    );
};

export default MedicalReportTableOperations;