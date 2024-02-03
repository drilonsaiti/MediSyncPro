import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateDoctor} from "./useCreateDoctor.js";
import {useEditDoctor} from "./useEditDoctor.js";
import {useClinics} from "../Clinic/useClinic.js";
import {useSpecializations} from "../Specializations/useSpecializations.js";
import Select from "../../ui/Select.jsx";
import {useEffect, useState} from "react";

const CreateDoctorForm = ({doctorToEdit = {}, onCloseModal}) => {
    const {doctorId, ...editValues} = doctorToEdit;
    const isEditSession = Boolean(doctorId);
    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating, createDoctor} = useCreateDoctor();
    const {isEditing, editDoctor} = useEditDoctor();
    const {isLoading: isLoadingClinics, clinics} = useClinics();
    const {isLoading: isLoadingSpecz, specializations} = useSpecializations();
    const [refreshKey, setRefreshKey] = useState(1);

    useEffect(() => {
        // Do something that triggers the need to refresh Select
        // For example, after editing an item
        setRefreshKey((prevKey) => prevKey + 1);
    }, []);

    const isWorking = isCreating || isEditing || isLoadingClinics || isLoadingSpecz;

    const clinicsGrouped = clinics?.map(clinic => {
        return {
            value: clinic.clinicId,
            label: clinic.clinicName
        }
    })

    const specilzationsGrouped = specializations?.map(spez => {
        return {
            value: spez.specializationId,
            label: spez.specializationName
        }
    })

    function onSubmit(data) {

        if (isEditSession) editDoctor({newData: {...data, doctorId}, id: doctorId}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createDoctor({...data}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Doctor name" error={errors?.doctorName?.message}>
                <Input type="text" disabled={isWorking}
                       id="doctorName" {...register("doctorName", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Specialization" error={errors?.specializationId?.message}>
                <Select key={refreshKey} value={getValues('specializationId')} type="white"
                        options={specilzationsGrouped} disabled={isWorking}
                        id="specializationId" {...register("specializationId", {required: "This field is required"})}>

                </Select>
            </FormRow>

            <FormRow label="Education" error={errors?.education?.message}>
                <Input type="text" disabled={isWorking}
                       id="education" {...register("education", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Working time" error={errors?.workingDays?.message}>
                <Input type="text" disabled={isWorking}
                       id="workingDays" {...register("workingDays", {required: "This field is required"})}/>
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
                <Button disabled={isWorking}>{isEditSession ? "Edit doctor" : "Add doctor"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateDoctorForm;
