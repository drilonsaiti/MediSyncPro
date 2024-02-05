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
import CreatePatientForm from "../Patient/CreatePatientForm.jsx";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {formatCurrency} from "../../utils/helpers.js";
import {useClinicServicesById} from "../Clinic/useClinic.js";
import Spinner from "../../ui/Spinner.jsx";

const TooltipOption = ({ innerProps, label, data }) => (
    <div {...innerProps} title={`Tooltip: ${data.tooltip}`}>
        {label}
    </div>
);
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
    .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range {
        border-radius: 0.3rem;
        background-color: var(--color-brand-700) !important;
        color: #fff;
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

const animatedComponents = makeAnimated();
const CreateAppointmentForm = ({appointmentToEdit = {}, onCloseModal, clinicId}) => {
    const {appointmentId, ...editValues} = appointmentToEdit;
    const isEditSession = Boolean(appointmentId);
    const {register, handleSubmit, reset, getValues, setValue, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });

    const {errors} = formState;
    const {isCreating, createAppointment} = useCreateAppointment();
    const {isEditing, editAppointment} = useEditAppointment();
    const {isLoading: isLoadingServices, clinicServices} = useClinicServicesById(clinicId);
    const {isCreating: isCreatingAppointment, createAppointmentByRecep} = useCreateAppointmentByReceptionist();
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

    const [startDate, setStartDate] = useState(isEditSession ? new Date(editValues.appointmentDate) : roundedDateTime);
    const isWorking = isCreating || isEditing || isLoadingServices || isCreatingAppointment || isLoading;


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
        console.log("TIME:" + time);
        const currentDate = new Date();
        const selectedDate = new Date(time);

        const startTime = new Date(currentDate);
        startTime.setHours(7, 0, 0, 0); // Set to 07:00:00.000

        const endTime = new Date(currentDate);
        endTime.setHours(19, 0, 0, 0); // Set to 19:00:00.000

        const withinTimeRange = currentDate.getTime() >= startTime.getTime() && currentDate.getTime() <= endTime.getTime();
        const futureDate = selectedDate.getTime() > currentDate.getTime(); // Check if the selected date is in the future

        console.log(withinTimeRange, futureDate);
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

    const servicesGrouped = clinicServices?.map(clinic => {
        return {
            value: clinic.serviceId,
            label: `${clinic.serviceName} - ${formatCurrency(clinic.price)}`
        }
    })
    function onSubmit(data) {
        const timeZoneOffset = startDate.getTimezoneOffset();
        const adjustedStartDate = new Date(startDate.getTime() - timeZoneOffset * 60000); // Adjust for time zone offset

        if (isEditSession) {
            const serviceName = clinicServices?.map((clinic,index) => {
                if(clinic.serviceId === getValues('serviceId')[index])
                    return clinic.serviceName;
            }).filter(s => s !== undefined);
            console.log("EDIT SESSION");
            console.log(serviceName);
            editAppointment({newData: {...data, appointmentId,serviceName}, id: appointmentId,}, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                },

            })
        }else {
            if (user) {
                createAppointmentByRecep(
                    {newData: {...data, clinicId, appointment: adjustedStartDate}}, {
                        onSuccess: () => {
                            reset();
                            onCloseModal?.();
                        },
                    }
                )
            } else {
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
    }, [appointmentId, dates]);

    if (isWorking) return <Spinner/>

    console.log(editValues);

    const selectedValues = editValues?.serviceName?.map(service => {
        const selectedService = clinicServices.find(srv => srv.serviceName === service);
        return {
            value: selectedService ? selectedService.serviceId : null,
            label: selectedService ? `${service} - ${formatCurrency(selectedService.price)}` : ''
        };
    });



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
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
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
                    appendToBody
                />

                <DatePickerWrapperStyles />


            </StyledFormRow>

            <FormRow label="Services" error={errors?.servicesId?.message} style={{position: 'relative'}}>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isSearchable
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
                    styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                    defaultValue={selectedValues}
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
