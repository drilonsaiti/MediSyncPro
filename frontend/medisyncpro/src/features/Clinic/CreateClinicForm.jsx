import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {useCreateClinic} from "./useCreateClinic.js";
import {useEditClinic} from "./useEditClinic.js";
import {useSpecializations} from "../Specializations/useSpecializations.js";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import Spinner from "../../ui/Spinner.jsx";
import {useClinicServicesById} from "./useClinic.js";
import {useEffect, useState} from "react";
const animatedComponents = makeAnimated();

const CreateClinicForm = ({clinicToEdit = {}, onCloseModal}) => {
    const {clinicId, ...editValues} = clinicToEdit;
    const {isLoading, specializations} = useSpecializations();
    const {isLoading: isLoadingServices, clinicServices} = useClinicServicesById(clinicId);
    const isEditSession = Boolean(clinicId);
    const {register, handleSubmit, reset, getValues,setValue, formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {isCreating, createClinic} = useCreateClinic();
    const {isEditing, editClinic} = useEditClinic();

    const selectedValues = editValues?.specializations?.map(spec => {
        const selectedService = specializations?.find(srv => srv.specializationId === spec.specializationId);
        return {
            value: selectedService ? selectedService.specializationId : null,
            label: selectedService ? selectedService.specializationName : ''
        };
    });
    const selectedServicesValues = editValues?.serviceDto?.map(service => {
        return {
            value:  service.services,
            label:  service.services
        };
    });
    const optionsServices = clinicServices
        ?.sort((a, b) => a.serviceId - b.serviceId)
        ?.reduce((groupedOptions, service) => {
            const label = specializations?.find(spec => spec.specializationId === service.specializations.specializationId).specializationName;

            const existingGroup = groupedOptions?.find(group => group.label === label);

            if (existingGroup) {
                existingGroup.options.push({
                    value: service.serviceName,
                    label: service.serviceName
                });
            } else {
                groupedOptions.push({
                    label: label,
                    options: [{
                        value: service.serviceName,
                        label: service.serviceName
                    }]
                });
            }

            return groupedOptions;
        }, []);
    const [selectedSpecializations, setSelectedSpecializations] = useState(selectedValues);
    const [optionsService, setOptionsService] = useState(optionsServices);
    const [selectedService,setSelectedService] = useState(selectedServicesValues);
    const isWorking = isCreating || isEditing || isLoading || isLoadingServices || !selectedService;

    useEffect(() => {
        const updatedSelectedOptionsServices = clinicServices
            ?.sort((a, b) => a.serviceId - b.serviceId)
            ?.reduce((groupedOptions, service) => {
                const label = specializations?.find(spec => spec.specializationId === service.specializations.specializationId).specializationName;
                console.log(selectedSpecializations);
                if (selectedSpecializations?.find(spec => spec.value === service.specializations.specializationId)) {
                    const existingGroup = groupedOptions.find(group => group.label === label);

                    if (existingGroup) {
                        existingGroup.options.push({
                            value: service.serviceName,
                            label: service.serviceName
                        });
                    } else {
                        groupedOptions.push({
                            label: label,
                            options: [{
                                value: service.serviceName,
                                label: service.serviceName
                            }]
                        });
                    }
                }

                return groupedOptions;
            }, []);

        const list = updatedSelectedOptionsServices?.filter((item,index) =>  item.options?.flatMap(i => selectedService.filter(s => s.value === i.value)));

        setSelectedService(list?.flatMap(option => option.options));
        setOptionsService(updatedSelectedOptionsServices);
    }, [selectedSpecializations]);

    if (isWorking) return <Spinner/>


    function onSubmit(data) {
        const selectedSpecializations = getValues("specializations")?.sort((a, b) => a.specializationId - b.specializationId)?.map(spec => {
            return {
                specializationId: spec.value,
                specializationName: spec.label
            };
        });

        const selectedServices = clinicServices?.map(clinic => {
            const findedService = selectedService?.find(s => s.value === clinic.serviceName);
            if (findedService) {
                return {
                    serviceId: clinic.serviceId,
                    serviceName: clinic.serviceName
                };
            }
            return null;
        })?.filter(service => service !== null);

        if (isEditSession) {
            editClinic({
                newData: {
                    ...data,
                    clinicId,
                    specializations: selectedSpecializations,
                    serviceDto: selectedServices
                }, id: clinicId
            }, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                },

            })
        }else createClinic({...data,
            specializations: selectedSpecializations,
            serviceDto: selectedServices}, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }
    const optionsSpecializations = specializations?.sort((a, b) => a.specializationId - b.specializationId)?.map(spec => {
        return {
            value: spec.specializationId,
            label: spec.specializationName,
        }
    })

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Clinic name" error={errors?.clinicName?.message}>
                <Input type="text" disabled={isWorking}
                       id="clinicName" {...register("clinicName", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Address" error={errors?.clinicName?.message}>
                <Input type="text" disabled={isWorking}
                       id="address" {...register("address", {required: "This field is required"})}/>
            </FormRow>
            <FormRow label="Specializations">
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isSearchable
                    isMulti
                    options={optionsSpecializations}
                    onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(option => option);
                        setSelectedSpecializations(selectedValues);
                        setValue("specializations", selectedValues);
                    }}
                    closeOnSelect={false}
                    menuPortalTarget={document.body}
                    styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                    defaultValue={selectedValues}
                />
            </FormRow>

            <FormRow label="Services">
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isSearchable
                    isMulti
                    options={optionsService}
                    onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(option => option);
                        setSelectedService(selectedValues);
                        setValue("serviceDto", selectedValues);
                    }}
                    closeOnSelect={false}
                    menuPortalTarget={document.body}
                    styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                    defaultValue={selectedService}
                    value={selectedService}
                />
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
