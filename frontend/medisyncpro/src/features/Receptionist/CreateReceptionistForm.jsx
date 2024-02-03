import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateReceptionist} from "./useCreateReceptionist.js";
import {useEditReceptionist} from "./useEditReceptionist.js";
import Select from "../../ui/Select.jsx";
import {useEffect, useState} from "react";
import {useClinics} from "../Clinic/useClinic.js";

const CreateReceptionistForm = ({receptionistToEdit = {}, onCloseModal}) => {
    const {receptionistId, ...editValues} = receptionistToEdit;
    const isEditSession = Boolean(receptionistId);
    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating, createReceptionist} = useCreateReceptionist();
    const {isEditing, editReceptionist} = useEditReceptionist();
    const {isLoading, clinics} = useClinics();
    const [refreshKey, setRefreshKey] = useState(1);

    useEffect(() => {
        // Do something that triggers the need to refresh Select
        // For example, after editing an item
        setRefreshKey((prevKey) => prevKey + 1);
    }, []);

    const isWorking = isCreating || isEditing || isLoading;

    const clinicsGrouped = clinics?.map(clinic => {
        return {
            value: clinic.clinicId,
            label: clinic.clinicName
        }
    })

    function onSubmit(data) {

        if (isEditSession) editReceptionist({newData: {...data, receptionistId}, id: receptionistId}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createReceptionist({...data}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Receptionist name" error={errors?.receptionistName?.message}>
                <Input type="text" disabled={isWorking}
                       id="receptionistName" {...register("receptionistName", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Email" error={errors?.emailAddress?.message}>
                <Input type="email" disabled={isWorking}
                       id="emailAddress" {...register("emailAddress", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Clinic" error={errors?.clinicId?.message}>
                <Select key={refreshKey} value={getValues('clinicId')} type="white"
                        options={clinicsGrouped} disabled={isWorking}
                        id="clinicId" {...register("clinicId", {required: "This field is required"})}>

                </Select>
            </FormRow>

            <FormRow>

                <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit receptionist" : "Add receptionist"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateReceptionistForm;
