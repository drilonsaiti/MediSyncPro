import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateClinicService} from "./useCreateClinicService.js";
import {useEditClinicService} from "./useEditClinicService.js";
import {useSpecializations} from "../Specializations/useSpecializations.js";
import {useEffect, useState} from "react";
import Select from "../../ui/Select.jsx";

const CreateClinicServiceForm = ({clinicServiceToEdit = {}, onCloseModal}) => {
    const {serviceId, ...editValues} = clinicServiceToEdit;
    const isEditSession = Boolean(serviceId);
    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating, createClinicService} = useCreateClinicService();
    const {isEditing, editClinicService} = useEditClinicService();
    const {isLoading: isLoadingSpecz, specializations} = useSpecializations();
    const [refreshKey, setRefreshKey] = useState(1);

    useEffect(() => {
        // Do something that triggers the need to refresh Select
        // For example, after editing an item
        setRefreshKey((prevKey) => prevKey + 1);
    }, []);

    const isWorking = isCreating || isEditing || isLoadingSpecz;

    const specilzationsGrouped = specializations?.map(spez => {
        return {
            value: spez.specializationId,
            label: spez.specializationName
        }
    })

    function onSubmit(data) {

        if (isEditSession) editClinicService({newData: {...data, serviceId}, id: serviceId}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createClinicService({...data}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Service name" error={errors?.clinicServiceName?.message}>
                <Input type="text" disabled={isWorking}
                       id="serviceName" {...register("serviceName", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Duration name" error={errors?.durationMinutes?.message}>
                <Input type="number" disabled={isWorking}
                       id="durationMinutes" {...register("durationMinutes", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Price" error={errors?.price?.message}>
                <Input type="number" disabled={isWorking}
                       id="price" {...register("price", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Specialization" error={errors?.specializationId?.message}>
                <Select key={refreshKey} value={getValues('specializationId')} type="white"
                        options={specilzationsGrouped} disabled={isWorking}
                        id="specializationId" {...register("specializationId", {required: "This field is required"})}>

                </Select>
            </FormRow>

            <FormRow>

                <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit clinicService" : "Add clinicService"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateClinicServiceForm;
