import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import FormRow, {Label, StyledFormRow} from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateAppointment, useCreateAppointmentByReceptionist} from "./useCreateAppointment.js";
import {useEditAppointment} from "./useEditAppointment.js";
import {useEffect, useState} from "react";
import {createGlobalStyle} from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {addDays, setHours, setMilliseconds, setMinutes, setSeconds} from "date-fns";
import {useAppointmentDates} from "./useAppointmentDates.js";
import {useClinicServices} from "../ClinicServices/useClinicService.js";
import CreatePatientForm from "../Patient/CreatePatientForm.jsx";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

 const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker.full-width {
        z-index: 9999 !important; /* Increase the z-index */
        border: 1px solid var(--color-grey-300);
        background-color: var(--color-grey-0);
        border-radius: var(--border-radius-sm);
        padding: 0.8rem 1.2rem;
        box-shadow: var(--shadow-sm);
        display: inline-block;
        width: 28.5%;
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
        background-color: var(--color-brand-700);
        color: #fff;
    }


    input {
        display: block;
        border: none;
        background-color: transparent;

        &:focus {
            outline: none;
        }
    }
`;
const animatedComponents = makeAnimated();
const CreateAppointmentForm = ({appointmentToEdit = {}, onCloseModal,clinicId}) => {
    const {appointmentId, ...editValues} = appointmentToEdit;
    const isEditSession = Boolean(appointmentId);
    const {register, handleSubmit, reset, getValues,setValue, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });

    const {errors} = formState;
    const {isCreating, createAppointment} = useCreateAppointment();
    const {isEditing, editAppointment} = useEditAppointment();
    const {isLoading: isLoadingServices, clinicServices} = useClinicServices();
    const {isCreating:isCreatingAppointment,createAppointmentByRecep} = useCreateAppointmentByReceptionist();
    const {isLoading, dates} = useAppointmentDates();
    const [bookedDates, setBookedDates] = useState([]);
    const [refreshKey, setRefreshKey] = useState(100);
    const user = "rec";

    useEffect(() => {
        // Do something that triggers the need to refresh Select
        // For example, after editing an item
        setRefreshKey((prevKey) => prevKey + 1);
    }, []);

    const currentDateTime = new Date();
    const currentMinutes = currentDateTime.getMinutes();
    const roundedMinutes = Math.ceil(currentMinutes / 30) * 30;

    const roundedDateTime = setMinutes(setSeconds(setMilliseconds(currentDateTime, 0), 0), roundedMinutes);

    const [startDate, setStartDate] = useState(roundedDateTime);
    const isWorking = isCreating || isEditing;

    const [includeTimes, setIncludeTimes] = useState([]);

    useEffect(() => {
        const generateIncludeTimes = () => {
            const times = [];
            const startTime = new Date();
            startTime.setHours(7, 0, 0);

            const endTime = new Date();
            endTime.setHours(19, 0, 0);

            const interval = 30;
            let currentTime = new Date(startTime);

            while (currentTime <= endTime) {
                const formattedTime = currentTime.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                    timeZone: 'Europe/Belgrade',
                });

                times.push(new Date(`${currentTime.toDateString()} ${formattedTime}`));
                currentTime = new Date(currentTime.getTime() + interval * 60000);
            }

            return times;
        };

        setIncludeTimes(generateIncludeTimes());
    }, []);

    const filterPassedTime = (time) => {
        console.log("TIME:" +time);
        const currentDate = new Date();
        const selectedDate = new Date(time);

        const startTime = new Date(currentDate);
        startTime.setHours(7, 0, 0, 0); // Set to 07:00:00.000

        const endTime = new Date(currentDate);
        endTime.setHours(19, 0, 0, 0); // Set to 19:00:00.000

        const withinTimeRange = currentDate.getTime() >= startTime.getTime() && currentDate.getTime() <= endTime.getTime();
        const futureDate = selectedDate.getTime() > currentDate.getTime(); // Check if the selected date is in the future

        console.log(withinTimeRange,futureDate);
        return withinTimeRange || futureDate;
    };

    const filterTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        const startTime = new Date(currentDate);
        startTime.setHours(7, 0, 0, 0); // Set to 07:00:00.000

        const endTime = new Date(currentDate);
        endTime.setHours(19, 0, 0, 0); // Set to 19:00:00.000

        const withinTimeRange = selectedDate.getTime() >= startTime.getTime() && selectedDate.getTime() <= endTime.getTime();

        return withinTimeRange;
    };

    function onSubmit(data) {
        const timeZoneOffset = startDate.getTimezoneOffset();
        const adjustedStartDate = new Date(startDate.getTime() - timeZoneOffset * 60000); // Adjust for time zone offset

        if (isEditSession) editAppointment({newData: {...data, appointmentId}, id: appointmentId}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else {
            if(user){
                createAppointmentByRecep(
                    {newData:{...data,clinicId,appointment:adjustedStartDate}},{
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
                )
            }else{
                createAppointment({...data}, {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    }
                });
            }
        }
    }

    useEffect(() => {
        const fetchBookedDates = () => {
            try {
                const bookedDatesdata = dates?.map(bookingDate => ({
                    start: new Date(Date.parse(bookingDate.startDate)),
                }));

                const excludedDates = bookedDatesdata?.flatMap((dates) => {
                    return addDays(dates.start, 0);
                });

                setBookedDates(excludedDates);

            } catch (error) {
                console.error('Error fetching booked dates:', error);
            }
        };

        fetchBookedDates();
    }, [appointmentId]);

    const servicesGrouped = clinicServices?.map(clinic => {
        return {
            value: clinic.serviceId,
            label: clinic.serviceName
        }
    })

    const FORM_ROWS = (
        <>
            {user &&
            <CreatePatientForm registerTest={register}/>
            }
            <StyledFormRow label="Calendar" orientation="horizontal" calendar="calendar">

                <Label>Calendar</Label>
                <DatePicker
                    wrapperClassName='date_picker full-width'
                    selected={startDate}
                    onChange={(date) => {

                            setStartDate(date)
                            console.log("TRUE");

                        filterPassedTime(date)
                    }}
                    showTimeSelect
                    includeTimes={includeTimes}
                    minTime={setHours(setMinutes(new Date(), 0), 7)}
                    maxTime={setHours(setMinutes(new Date(), 0), 19)}
                    dateFormat="MMMM d, yyyy HH:mm"
                    filterTime={filterPassedTime}
                    timeFormat="HH:mm"
                    excludeDates={bookedDates}
                    containerStyle={{width: '100%'}}
                    isClearable={true}
                    placeholderText="Click to select a date"
                    popperModifiers={{
                        flip: {behavior: ["bottom"]},
                        preventOverflow: {enabled: false},
                        hide: {enabled: false}
                    }}
                />

                <DatePickerWrapperStyles/>


            </StyledFormRow>

            <FormRow label="Services" error={errors?.servicesId?.message} style={{position: 'relative'}}>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}

                    isMulti
                    options={servicesGrouped}
                    onChange={(selectedOptions) => {
                        // Extract the selected values from the selected options
                        const selectedValues = selectedOptions.map(option => option.value);
                        console.log(selectedValues);
                        setValue("serviceId", selectedValues);
                    }}
                    closeOnSelect={false}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                />
            </FormRow>
        </>
    )

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            {FORM_ROWS}

            <FormRow>

                <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit appointment" : "Add appointment"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateAppointmentForm;
