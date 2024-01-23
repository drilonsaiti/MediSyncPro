import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import Input from "../../ui/Input.jsx";
import FormRow, {Label, StyledFormRow} from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateAppointment} from "./useCreateAppointment.js";
import {useEditAppointment} from "./useEditAppointment.js";
import {useEffect, useState} from "react";
import {createGlobalStyle} from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {addDays, setHours, setMinutes} from "date-fns";
import {differenceInDays} from "date-fns/differenceInDays";
import {useAppointmentDates} from "./useAppointmentDates.js";
import Select from "../../ui/Select.jsx";
import {useClinicServices} from "../ClinicServices/useClinicService.js";
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


    input {
        display: block;
        border: none;
        background-color: transparent;
        
        &:focus {
            outline: none;
        }
    }
`;

const CreateAppointmentForm = ({appointmentToEdit = {},onCloseModal}) => {
    const {appointmentId,...editValues} = appointmentToEdit;
    const isEditSession = Boolean(appointmentId);
    const {register,handleSubmit,reset,getValues,formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating,createAppointment} = useCreateAppointment();
    const {isEditing,editAppointment} = useEditAppointment();
    const {isLoading:isLoadingServices,clinicServices} = useClinicServices();
    const [value, onChange] = useState(new Date());
    const {isLoading,dates} = useAppointmentDates();
    const [bookedDates,setBookedDates] = useState([]);
    const [refreshKey, setRefreshKey] = useState(1);

    useEffect(() => {
        // Do something that triggers the need to refresh Select
        // For example, after editing an item
        setRefreshKey((prevKey) => prevKey + 1);
    },[]);

    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 16),
    );
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
        const currentDate = new Date();
        const selectedDate = new Date(time);

        const startTime = new Date(currentDate);
        startTime.setHours(7, 0, 0, 0); // Set to 07:00:00.000

        const endTime = new Date(currentDate);
        endTime.setHours(19, 0, 0, 0); // Set to 19:00:00.000

        const withinTimeRange = currentDate.getTime() >= startTime.getTime() && currentDate.getTime() <= endTime.getTime();

        const futureDate = currentDate.getTime() < selectedDate.getTime();

        return withinTimeRange && futureDate;
    };
    function onSubmit(data) {

        if (isEditSession) editAppointment({newData: {...data,appointmentId},id:appointmentId},{
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createAppointment({...data},{
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    useEffect(() => {
        const fetchBookedDates =  () => {
            try {

                const bookedDatesdata = dates?.map(bookingDate => ({
                    start: new Date(Date.parse(bookingDate.startDate)),
                }));
                console.log("EXLUDED DATES");
                console.log(bookedDatesdata);

                const excludedDates = bookedDatesdata?.flatMap((dates) => {


                    return addDays(dates.start,0);
                });

                console.log(excludedDates);
                setBookedDates(excludedDates);
                console.log(bookedDatesdata);

               /* const earliestStartDate = bookedDates?.reduce(
                    (earliest, booking) => (booking.start < earliest ? booking.start : earliest),
                    new Date()
                );

                const latestEndDate = bookedDates?.reduce(
                    (latest, booking) => (booking.end > latest ? booking.end : latest),
                    new Date()
                );


                setMinStartDate(earliestStartDate.toISOString().split('T')[0]);
                setMaxEndDate(latestEndDate.toISOString().split('T')[0]);*/
            } catch (error) {
                console.error('Error fetching booked dates:', error);
            }
        };

        fetchBookedDates();
    }, [appointmentId ]);

    const servicesGrouped = clinicServices?.map(clinic =>  {
        return {
            value: clinic.serviceId,
            label: clinic.serviceName
        }
    })

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Specialization name" error={errors?.appointmentName?.message}>
                <Input type="text" disabled={isWorking} id="appointmentName" {...register("appointmentName",{required:"This field is required"})}/>
            </FormRow>

            <StyledFormRow label="Calendar"  orientation="horizontal" calendar="calendar">

                <Label>Calendar</Label>
                <DatePicker
                    wrapperClassName='date_picker full-width'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
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

                    popperModifiers={{ flip: { behavior: ["bottom"] }, preventOverflow: { enabled: false }, hide: { enabled: false } }}
                />

                <DatePickerWrapperStyles/>


            </StyledFormRow>

            <FormRow label="Clinic" error={errors?.serviceId?.message}>
                <Select key={refreshKey} value={getValues('serviceId')} type="white"
                        options={servicesGrouped} disabled={isWorking}
                        id="serviceId" {...register("serviceId",{required:"This field is required"})}>

                </Select>
            </FormRow>

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
