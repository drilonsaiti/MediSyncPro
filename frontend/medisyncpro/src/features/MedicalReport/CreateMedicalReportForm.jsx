import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";
import FormRow, {Label, StyledFormRow} from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateMedicalReport} from "./useCreateMedicalReport.js";
import {useEditMedicalReport} from "./useEditMedicalReport.js";
import Textarea from "../../ui/Textarea.jsx";
import DatePicker from "react-datepicker";
import {addDays, setHours, setMilliseconds, setMinutes, setSeconds} from "date-fns";
import {useEffect, useState} from "react";
import {useAppointmentDates} from "../Appointment/useAppointmentDates.js";
import {createGlobalStyle} from "styled-components";

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

    .react-datepicker__day--selected {
        background-color: var(--color-primary-900);
        text-align: center;

    }

    .react-datepicker__current-month {
        font-size: 1.5rem !important;
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


    .react-datepicker__day {
        &--outside-month {
            color: var(--color-grey-400) !important;
        }
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


    input {
        display: block;
        border: none;
        background-color: transparent;

        &:focus {
            outline: none;
        }
    }
`;
const CreateMedicalReportForm = ({medicalReportToEdit = {}, onCloseModal, appointmentDate, appointmentId}) => {
    const {reportId, ...editValues} = medicalReportToEdit;
    const isEditSession = Boolean(reportId);
    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating, createMedicalReport} = useCreateMedicalReport();
    const {isEditing, editMedicalReport} = useEditMedicalReport();
    const {isLoading, dates} = useAppointmentDates();
    const [bookedDates, setBookedDates] = useState([]);

    const currentDateTime = new Date();
    const currentMinutes = currentDateTime.getMinutes();
    const roundedMinutes = Math.ceil(currentMinutes / 30) * 30;

    const roundedDateTime = setMinutes(setSeconds(setMilliseconds(currentDateTime, 0), 0), roundedMinutes);

    const [startDate, setStartDate] = useState(roundedDateTime);

    const [includeTimes, setIncludeTimes] = useState([]);
    const isWorking = isCreating || isEditing || isLoading;


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
        const currentDate = new Date();
        const selectedDate = new Date(time);

        const startTime = new Date(currentDate);
        startTime.setHours(7, 0, 0, 0); // Set to 07:00:00.000

        const endTime = new Date(currentDate);
        endTime.setHours(19, 0, 0, 0); // Set to 19:00:00.000

        const withinTimeRange = currentDate.getTime() >= startTime.getTime() && currentDate.getTime() <= endTime.getTime();
        const futureDate = selectedDate.getTime() > currentDate.getTime(); // Check if the selected date is in the future

        return withinTimeRange || futureDate;
    };

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
    }, [dates]);

    function onSubmit(data) {
        if (isEditSession) editMedicalReport({
            newData: {
                ...data,
                reportId,
                appointmentId,
                nextAppointmentDate: startDate
            }, id: reportId
        }, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createMedicalReport({newData: {...data, appointmentId, nextAppointmentDate: startDate}}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Disease" error={errors?.disease?.message}>
                <Textarea type="text" disabled={isWorking}
                          id="disease" {...register("disease", {required: "This field is required"})}/>
            </FormRow>
            <FormRow label="Medicine name" error={errors?.medicineName?.message}>
                <Textarea type="text" disabled={isWorking}
                          id="medicineName" {...register("medicineName", {required: "This field is required"})}/>
            </FormRow>

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

            {/*<FormRow label="Next appointment" error={errors?.nextAppointmentDate?.message}>
                <Input type="datetime-local" disabled={isWorking} id="nextAppointmentDate" {...register("nextAppointmentDate",
                    )}/>
            </FormRow>*/}

            <FormRow label="Rest days" error={errors?.noOfDays?.message}>
                <Input type="number" disabled={isWorking} id="noOfDays" {...register("noOfDays")}/>
            </FormRow>

            <FormRow>

                <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit medical report" : "Add medical report"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateMedicalReportForm;
