import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import Input from "../../ui/Input.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateMedicalReport} from "./useCreateMedicalReport.js";
import {useEditMedicalReport} from "./useEditMedicalReport.js";
import Textarea from "../../ui/Textarea.jsx";

const CreateMedicalReportForm = ({medicalReportToEdit = {},onCloseModal}) => {
    const {reportId,...editValues} = medicalReportToEdit;
    const isEditSession = Boolean(reportId);
    const {register,handleSubmit,reset,getValues,formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating,createMedicalReport} = useCreateMedicalReport();
    const {isEditing,editMedicalReport} = useEditMedicalReport();

    const isWorking = isCreating || isEditing;
    function onSubmit(data) {

        if (isEditSession) editMedicalReport({newData: {...data,reportId},id:reportId},{
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createMedicalReport({...data},{
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Disease" error={errors?.disease?.message}>
                <Textarea type="text" disabled={isWorking} id="disease" {...register("disease",{required:"This field is required"})}/>
            </FormRow>
            <FormRow label="Medicine name" error={errors?.medicineName?.message}>
                <Input type="text" disabled={isWorking} id="medicineName" {...register("medicineName",{required:"This field is required"})}/>
            </FormRow>

            <FormRow label="Quantity (how many days)" error={errors?.quantity?.message}>
                <Input type="number" disabled={isWorking} id="quantity" {...register("quantity",{required:"This field is required"})}/>
            </FormRow>

            <FormRow label="Next appointment" error={errors?.nextAppointmentDate?.message}>
                <Input type="datetime-local" disabled={isWorking} id="nextAppointmentDate" {...register("nextAppointmentDate",
                    )}/>
            </FormRow>

            <FormRow label="Rest days" error={errors?.noOfDays?.message}>
                <Input type="number" disabled={isWorking} id="noOfDays" {...register("noOfDays")}/>
            </FormRow>

            <FormRow>

                <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit medicalr eport" : "Add medical report"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateMedicalReportForm;
