import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateSpecializations} from "./useCreateSpecializations.js";
import {useEditSpecializations} from "./useEditSpecializations.js";

const CreateSpecializationForm = ({specializationToEdit = {}, onCloseModal}) => {
    const {specializationId, ...editValues} = specializationToEdit;
    const isEditSession = Boolean(specializationId);
    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating, createSpecializations} = useCreateSpecializations();
    const {isEditing, editSpecializations} = useEditSpecializations();

    const isWorking = isCreating || isEditing;

    function onSubmit(data) {

        if (isEditSession) editSpecializations({newData: {...data, specializationId}, id: specializationId}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createSpecializations({...data}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Specialization name" error={errors?.specializationName?.message}>
                <Input type="text" disabled={isWorking}
                       id="specializationName" {...register("specializationName", {required: "This field is required"})}/>
            </FormRow>

            <FormRow>

                <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit specialization" : "Add specialization"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateSpecializationForm;
