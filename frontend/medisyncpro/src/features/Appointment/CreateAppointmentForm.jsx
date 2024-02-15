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
import {formatCurrency, isAnyDayFullyBooked} from "../../utils/helpers.js";
import {useClinicServicesById} from "../Clinic/useClinic.js";
import Spinner from "../../ui/Spinner.jsx";
import {useScheduleByDoctorId} from "../ClinicSchedule/useClinicSchedule.js";
import Heading from "../../ui/Heading.jsx";
import {Roles} from "../../utils/services.js";
import {useFindByEmailOrContactNumber} from "../Patient/useFindByEmailOrContactNumber.js";

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

    .react-datepicker-wrapper {
        border: 1px solid var(--color-brand-700);
    }

    .react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover, .react-datepicker__month-text--selected:hover, .react-datepicker__month-text--in-selecting-range:hover, .react-datepicker__month-text--in-range:hover, .react-datepicker__quarter-text--selected:hover, .react-datepicker__quarter-text--in-selecting-range:hover, .react-datepicker__quarter-text--in-range:hover, .react-datepicker__year-text--selected:hover, .react-datepicker__year-text--in-selecting-range:hover, .react-datepicker__year-text--in-range:hover {
        background-color: var(--color-primary-900);
    }

    .react-datepicker__day--keyboard-selected {
        background-color: var(--color-primary-300);

    }

    .react-datepicker__day--keyboard-selected:hover, .react-datepicker__month-text--keyboard-selected:hover, .react-datepicker__quarter-text--keyboard-selected:hover, .react-datepicker__year-text--keyboard-selected:hover {
        background-color: var(--color-primary-300);
    }

    .react-datepicker__day:hover {
        background-color: var(--color-primary-900);
        color: var(--color-grey-0);

    }

    .react-datepicker__day {
        &--outside-month {
            color: var(--color-grey-400) !important;

            &:hover {
                color: var(--color-grey-0) !important;
            }
        }
    }

    .react-datepicker__input-container .react-datepicker__view-calendar-icon {
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

    .react-datepicker__calendar-icon {
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
const CreateAppointmentForm = ({appointmentToEdit = {}, onCloseModal, clinicId, doctorId, doctorName, clinicName}) => {
    const {appointmentId, ...editValues} = appointmentToEdit;
    const isEditSession = Boolean(appointmentId);
    const {register, handleSubmit, reset, getValues, setValue, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {scheduleByDoctor, isLoadingScheduleByDoctor} = useScheduleByDoctorId(doctorId)
    const {errors} = formState;
    const {isCreating, createAppointment} = useCreateAppointment();
    const {isEditing, editAppointment} = useEditAppointment();
    const {isLoading: isLoadingServices, clinicServices} = useClinicServicesById(clinicId);
    const {isCreating: isCreatingAppointment, createAppointmentByRecep} = useCreateAppointmentByReceptionist();
    const {isLoading, dates} = useAppointmentDates(clinicId);
    const [bookedDates, setBookedDates] = useState([]);

    const user = Roles();


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

    const generateIncludeDates = () => {
        if (!doctorId || !scheduleByDoctor) return [];

        const dates = new Set();
        scheduleByDoctor?.forEach(slot => {
            const slotDate = new Date(slot.startTime);
            dates.add(slotDate.toDateString());
        });
        return Array.from(dates).map(dateString => new Date(dateString));
    };

    const filterDate = (date) => {
        const includeDates = generateIncludeDates();

        const dateString = date.toDateString();
        return includeDates.some(includeDate => includeDate.toDateString() === dateString);
    };

    const filterTime = (time) => {
        const selectedDate = new Date(time);
        const selectedDay = selectedDate.toDateString();
        const includeDates = generateIncludeDates();

        if (!includeDates?.some(date => date.toDateString() === selectedDay)) {
            return false;
        }

        return scheduleByDoctor.some(schedule => {
            const {startTime} = schedule;
            const scheduleStart = new Date(startTime);
            return (
                selectedDate.getDate() === scheduleStart.getDate() &&
                selectedDate.getHours() === scheduleStart.getHours() &&
                selectedDate.getMinutes() === scheduleStart.getMinutes()
            );
        });
    };

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        const startTime = new Date(currentDate);
        startTime.setHours(7, 0, 0, 0);

        const endTime = new Date(currentDate);
        endTime.setHours(19, 0, 0, 0);

        const withinTimeRange = currentDate.getTime() >= startTime.getTime() && currentDate.getTime() <= endTime.getTime();
        const futureDate = selectedDate.getTime() > currentDate.getTime();

        // Logic for checking excluded times
        const excludedTimesForDay = dates?.filter(date => {
            const startDate = new Date(Date.parse(date.startDate));
            return startDate.toDateString() === selectedDate.toDateString();
        });

        const excludedTimes = excludedTimesForDay?.some(date => {
            const startDate = new Date(Date.parse(date.startDate));
            return startDate.getHours() === selectedDate.getHours() && startDate.getMinutes() === selectedDate.getMinutes();
        });

        return withinTimeRange && futureDate && !excludedTimes;
    };

    const filterPassedDate = (date) => {
        const currentDate = new Date();
        const selectedDate = new Date(date);

        currentDate.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        const futureDate = selectedDate.getTime() >= currentDate.getTime();

        return futureDate;
    };


    const servicesGrouped = Array.isArray(clinicServices) ? clinicServices?.map(clinic => ({
        value: clinic.serviceId,
        label: `${clinic.serviceName} - ${formatCurrency(clinic.price)}`
    })) : [];

    function onSubmit(data) {
        const timeZoneOffset = startDate.getTimezoneOffset();
        const adjustedStartDate = new Date(startDate.getTime() - timeZoneOffset * 60000); // Adjust for time zone offset

        if (isEditSession) {
            const serviceName = clinicServices?.map((clinic, index) => {
                if (clinic.serviceId === getValues('serviceId')[index])
                    return clinic.serviceName;
            }).filter(s => s !== undefined);
            editAppointment({newData: {...data, appointmentId, serviceName}, id: appointmentId,}, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                },

            })
        } else {
            if (user.includes("RECEPTIONIST")) {
                createAppointmentByRecep(
                    {newData: {...data, clinicId, appointment: adjustedStartDate}}, {
                        onSuccess: () => {
                            reset();
                            onCloseModal?.();
                        },
                    }
                )
            } else {
                createAppointment({...data, clinicId, date: adjustedStartDate}, {
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
                const bookedDatesdata = isAnyDayFullyBooked(dates);
                const excludedDates = bookedDatesdata?.flatMap((dates) => {
                    return addDays(dates.start, 0);
                });
                setBookedDates(excludedDates);
            } catch (error) {
               return [];
            }
        };

        fetchBookedDates();
    }, [appointmentId, dates]);


    const portalTarget = document.createElement('div');
    document.body.appendChild(portalTarget);
    if (isWorking) return <Spinner/>


    const selectedValues = editValues?.serviceName?.map(service => {
        const selectedService = clinicServices?.find(srv => srv.serviceName === service);
        return {
            value: selectedService ? selectedService.serviceId : null,
            label: selectedService ? `${service} - ${formatCurrency(selectedService.price)}` : ''
        };
    });

    const FORM_ROWS = (
        <>
            {user.includes("RECEPTIONIST") &&
                <CreatePatientForm registerTest={register} getValuePatient={getValues} setValuePatient={setValue}/>
            }
            <StyledFormRow label="Calendar" orientation="horizontal" calendar="calendar">

                <Label>Calendar</Label>
                <DatePicker
                    wrapperClassName='date_picker full-width'
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date)
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
                    filterTime={doctorId ? filterTime : filterPassedTime}
                    filterDate={doctorId ? filterDate : filterPassedDate}
                    timeFormat="HH:mm"
                    excludeDates={bookedDates}

                    containerStyle={{width: '100%'}}
                    isClearable={true}
                    placeholderText="Click to select a date"
                    popperModifiers={{
                        flip: {behavior: ["bottom"]},
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: 'viewport',
                        },
                        hide: {enabled: false}
                    }}
                />

                <DatePickerWrapperStyles/>


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
                        setValue("serviceId", selectedValues);
                    }}
                    closeOnSelect={false}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: base => ({...base, zIndex: 9999}),
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            border: '1px solid var(--color-grey-300)',
                            borderRadius: 'var(--border-radius-sm)',
                            padding: '0.2rem .2rem',
                            boxShadow: 'var(--shadow-sm)',
                            backgroundColor: 'var(--color-grey-0)',
                            color: 'var(--color-grey-600)'
                        }),
                        option: (base, state) => ({
                            ...base,
                            color: state.isFocused || state.isSelected ? 'white' : 'var(--color-grey-600)',
                        })
                    }}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,

                        colors: {
                            ...theme.colors,
                            primary25: 'var(--color-brand-600)',
                            primary: 'var(--color-brand-700)',
                            neutral0: 'var(--color-grey-0)', // Background color
                            neutral80: 'var(--color-grey-600)', // Text color
                        },
                    })}
                    defaultValue={selectedValues}
                />
            </FormRow>
        </>
    )

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            {doctorId &&
                <Heading type="h3">The available appointment are only for {doctorName} at {clinicName}</Heading>}
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
