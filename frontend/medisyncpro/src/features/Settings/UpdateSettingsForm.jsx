import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from "./useSettings.js";
import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner.jsx";
import { useUpdateSettings } from "./useUpdateSettings.js";

function UpdateSettingsForm() {
    const {
        isPending,
        settings: settingsData
    } = useSettings();
    const { isUpdating, updatedSettings } = useUpdateSettings();

    if (isPending) return <Spinner />;

    function handleUpdate(e, field) {
        const { value } = e.target;

        if (!value || typeof settingsData.id === 'undefined') return;

        settingsData[field] = value;
        updatedSettings({ ...settingsData });
    }

    return (
        <Form>
            <FormRow label='Morning Start Time'>
                <Input type='datetime-local' id='morning-start-time' disabled={isUpdating} defaultValue={settingsData.morningStartTime} onBlur={e => handleUpdate(e, 'morningStartTime')} />
            </FormRow>
            <FormRow label='Morning End Time'>
                <Input type='datetime-local' id='morning-end-time' disabled={isUpdating} defaultValue={settingsData.morningEndTime} onBlur={e => handleUpdate(e, 'morningEndTime')} />
            </FormRow>
            <FormRow label='Afternoon Start Time'>
                <Input type='datetime-local' id='afternoon-start-time' disabled={isUpdating} defaultValue={settingsData.afternoonStartTime} onBlur={e => handleUpdate(e, 'afternoonStartTime')} />
            </FormRow>
            <FormRow label='Afternoon End Time'>
                <Input type='datetime-local' id='afternoon-end-time' disabled={isUpdating} defaultValue={settingsData.afternoonEndTime} onBlur={e => handleUpdate(e, 'afternoonEndTime')} />
            </FormRow>
            <FormRow label='Appointment Duration (minutes)'>
                <Input type='number' id='appointment-duration' disabled={isUpdating} defaultValue={settingsData.appointmentDurationMinutes} onBlur={e => handleUpdate(e, 'appointmentDurationMinutes')} />
            </FormRow>
            <FormRow label='Days to Generate'>
                <Input type='number' id='days-to-generate' disabled={isUpdating} defaultValue={settingsData.daysToGenerate} onBlur={e => handleUpdate(e, 'daysToGenerate')} />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
