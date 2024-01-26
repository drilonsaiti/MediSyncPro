import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateClinic} from "./useCreateClinic.js";
import {useEditClinic} from "./useEditClinic.js";

const CreateClinicForm = ({clinicToEdit = {},onCloseModal}) => {
    const {clinicId,...editValues} = clinicToEdit;
    const isEditSession = Boolean(clinicId);
    const {register,handleSubmit,reset,getValues,formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating,createPatient} = useCreateClinic();
    const {isEditing,editPatient} = useEditClinic();

    const isWorking = isCreating || isEditing;
    function onSubmit(data) {

        if (isEditSession) editPatient({newData: {...data,clinicId},id:clinicId},{
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createPatient({...data},{
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Specialization name" error={errors?.clinicName?.message}>
                <Input type="text" disabled={isWorking} id="clinicName" {...register("clinicName",{required:"This field is required"})}/>
            </FormRow>

            <FormRow>

                <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit clinic" : "Add clinic"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateClinicForm;
