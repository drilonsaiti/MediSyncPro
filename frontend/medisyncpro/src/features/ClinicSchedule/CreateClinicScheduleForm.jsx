import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateClinicSchedule} from "./useCreateClinicSchedule.js";
import {useEditClinicSchedule} from "./useEditClinicSchedule.js";

const CreateClinicScheduleForm = ({clinicScheduleToEdit = {}, onCloseModal}) => {
    const {scheduleId, ...editValues} = clinicScheduleToEdit;
    const isEditSession = Boolean(scheduleId);
    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating, createClinicSchedule} = useCreateClinicSchedule();
    const {isEditing, editClinicSchedule} = useEditClinicSchedule();

    const isWorking = isCreating || isEditing;

    function onSubmit(data) {

        if (isEditSession) editClinicSchedule({newData: {...data, scheduleId}, id: scheduleId}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createClinicSchedule({...data}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Specialization name" error={errors?.clinicScheduleName?.message}>
                <Input type="text" disabled={isWorking}
                       id="clinicScheduleName" {...register("clinicScheduleName", {required: "This field is required"})}/>
            </FormRow>

            <FormRow>

                <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit clinicSchedule" : "Add clinicSchedule"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateClinicScheduleForm;
