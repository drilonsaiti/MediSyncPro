import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreatePatient} from "./useCreatePatient.js";
import {useEditPatient} from "./useEditPatient.js";
import Select from "../../ui/Select.jsx";
import {useEffect, useState} from "react";
import {FindPatientByEmailOrPhone} from "./FindPatientByEmailOrPhone.js";
import {Roles} from "../../utils/services.js";
import {findByEmailOrContactNumber, getPatientForProfile} from "../../services/apiPatients.js";
import {useFindByEmailOrContactNumber} from "./useFindByEmailOrContactNumber.js";

const CreatePatientForm = ({patientToEdit = {}, onCloseModal, registerTest, getValuePatient, setValuePatient}) => {
    const {patientId, ...editValues} = patientToEdit;
    const isEditSession = Boolean(patientId);
    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating, createPatient} = useCreatePatient();
    const {isEditing, editPatient} = useEditPatient();
    const [refreshKey, setRefreshKey] = useState(1);
    const [email, setEmail] = useState("");


    useEffect(() => {
        // Do something that triggers the need to refresh Select
        // For example, after editing an item
        setRefreshKey((prevKey) => prevKey + 1);
    }, []);
    const isWorking = isCreating || isEditing;
    const genders = [
        {value: "MALE", label: "Male"},
        {value: "FEMALE", label: "Female"}
    ]
    useEffect(() => {
        const fetchPatientData = async () => {
            if (!registerTest || !getValuePatient) return;

            const patientEmail = email;
            console.log("ITS CALLED CALLED");

            if (patientEmail) {
                // Call backend to find patient by email
                const data = await findByEmailOrContactNumber(patientEmail);
                console.log(data);

                if (data) {
                    // Populate other input fields with patient data
                    setValuePatient('patientName', data.patientName);
                    setValuePatient('gender', data.gender);
                    setValuePatient('address', data.address);
                    !email.includes("@") ? setValuePatient('email',data.email) : setValuePatient('contactNumber', data.contactNumber);
                    setValuePatient('birthDay',data.birthDay)
                    // Set other fields as needed
                }
            }
        };

        if (email) {
            fetchPatientData();
        }
    }, [setEmail, email]);

    function onSubmit(data) {

        if (isEditSession) editPatient({newData: {...data, patientId}, id: patientId}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createPatient({...data}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    const user = Roles();

    const FORM_ROWS = (
        <>
            <FormRow label="Patient name" error={errors?.patientName?.message}>
                <Input type="text" disabled={isWorking}
                       id="patientName" {...registerTest("patientName", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Genders" error={errors?.gender?.message}>
                <Select key={refreshKey} value={getValues('gender')} type="white"
                        options={genders} disabled={isWorking}
                        id="gender" {...registerTest("gender", {required: "This field is required"})}>

                </Select>
            </FormRow>

            <FormRow label="Address" error={errors?.address?.message}>
                <Input type="text" disabled={isWorking}
                       id="address" {...registerTest("address", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Contact number" error={errors?.contactNumber?.message}>
                <Input type="text" disabled={isWorking}
                       id="contactNumber" {...registerTest("contactNumber", {required: "This field is required"})}
                       onChange={(e) => setEmail(e.target.value)}/>

            </FormRow>

            <FormRow label="Email" error={errors?.email?.message}>
                <Input type="email" disabled={isWorking}
                       id="email" {...registerTest("email", {required: "This field is required"})}
                       onChange={(e) => setEmail(e.target.value)}/>
            </FormRow>


            <FormRow label="Birthday" error={errors?.birthDay?.message}>
                <Input type="date" disabled={isWorking}
                       id="birthDay" {...registerTest("birthDay", {required: "This field is required"})}/>
            </FormRow>
        </>
    )

    return (
        <>
            {user.includes("RECEPTIONIST") ? FORM_ROWS :
                <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>


                    <FormRow>

                        <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                            Cancel
                        </Button>
                        <Button disabled={isWorking}>{isEditSession ? "Edit patient" : "Add patient"}</Button>
                    </FormRow>
                </Form>
            }
        </>
    );
};

export default CreatePatientForm;
