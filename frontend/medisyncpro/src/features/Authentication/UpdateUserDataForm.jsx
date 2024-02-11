import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Button from "../../ui/Button.jsx";
import {useProfile, useUpdateAvatar, useUpdateUser} from "./useUpdateUser.js";
import Form from "../../ui/Form.jsx";
import Spinner from "../../ui/Spinner.jsx";
import {useGetRole} from "../../services/useGetRole.js";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {useSpecializations} from "../Specializations/useSpecializations.js";
import GlobalStyles from "../../styles/GlobalStyles.js";
import {useState} from "react";

const animatedComponents = makeAnimated();
function UpdateUserDataForm() {

    const {profileData,isLoading} = useProfile();
    const {updateUser,isUpdating} = useUpdateUser();
    const {updateAvatar,isUpdatingAvatar} = useUpdateAvatar();
    const [fullName, setFullName] = useState(profileData?.fullName);
    const [education, setEducation] = useState(null);
    const {isLoading:isLoadingSpecilization, specializations} = useSpecializations();
    const [password, setPassword] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const {roles, isLoading: isLoadingRole} = useGetRole();

    const selectedValues = specializations?.map(spec => {
        const selectedService = specializations?.find(srv => srv.specializationId === spec.specializationId);
        return {
            value: selectedService.specializationId,
            label: selectedService.specializationName
        };
    });
    const [selectedSpecializations, setSelectedSpecializations] = useState(selectedValues);

    if (isLoading || isLoadingRole || isLoadingSpecilization) return <Spinner/>

/*  const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();*/

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({fullName,password},
        {
            onSuccess: () => {
                e.target.reset();
            }
        })
  }
    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        setAvatar(selectedFile);

        // Call the function to handle avatar submission
        handleSubmitAvatar(e, selectedFile);
    }
  function handleSubmitAvatar(e,value){



      const data = {
          'avatar': value,
          'user': profileData?.email
      }
      updateAvatar(data,{
          onSuccess: () => {
              setAvatar('');
          }
      })
  }

  function handleCancel(e) {
    setFullName(profileData.fullName);
    setAvatar(null);
  }

    const optionsSpecializations = specializations?.sort((a, b) => a.specializationId - b.specializationId)?.map(spec => {
        return {
            value: spec.specializationId,
            label: spec.specializationName,
        }
    })
    const genders = [
        {value: "MALE", label: "Male"},
        {value: "FEMALE", label: "Female"}
    ]
  let forms;
  if(roles.includes("DOCTOR")){
      forms = (
          <>
          <FormRow label='Education' >

              <Input
                  type='text'
                  value={education || profileData?.education}
                  disabled={isUpdating}
                  onChange={(e) => setEducation(e.target.value)}
                  id='education'
              />
          </FormRow>

              <FormRow label="Specializations">
                  <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isSearchable
                      options={optionsSpecializations}
                      closeOnSelect={false}
                      menuPortalTarget={document.body}

                      defaultValue={selectedValues}
                      styles={{menuPortal: base => ({...base, zIndex: 9999}),
                          control: (baseStyles, state) => ({
                              ...baseStyles,
                              border: '1px solid var(--color-grey-300)',
                              borderRadius: 'var(--border-radius-sm)',
                              padding:'0.2rem .2rem',
                              boxShadow: 'var(--shadow-sm)',
                              backgroundColor: 'var(--color-grey-0)',
                              color: 'var(--color-grey-600)'
                          }),
                          option: (base, state) => ({
                              ...base,
                              color: state.isFocused || state.isSelected ? 'white' : 'var(--color-grey-600)',
                          })
                      }}
                      theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,

                          colors: {
                              ...theme.colors,
                              primary25: 'var(--color-brand-600)',
                              primary: 'var(--color-brand-700)',
                              neutral0: 'var(--color-grey-0)', // Background color
                              neutral80: 'var(--color-grey-600)', // Text color
                          },
                      })}

                  />
              </FormRow>
          </>
      )
  }

  if(roles.includes("PATIENT")){
      forms = (
          <>
                  <FormRow label="Specializations">
                      <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isSearchable
                          options={genders}
                          closeOnSelect={false}
                          menuPortalTarget={document.body}
                          styles={{menuPortal: base => ({...base, zIndex: 9999}),
                              control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  border: '1px solid var(--color-grey-300)',
                                  borderRadius: 'var(--border-radius-sm)',
                                  padding:'0.2rem .2rem',
                                  boxShadow: 'var(--shadow-sm)',
                                  backgroundColor: 'var(--color-grey-0)',
                                  color: 'var(--color-grey-600)'
                              }),
                              option: (base, state) => ({
                                  ...base,
                                  color: state.isFocused || state.isSelected ? 'white' : 'var(--color-grey-600)',
                              })
                          }}
                          theme={(theme) => ({
                              ...theme,
                              borderRadius: 0,

                              colors: {
                                  ...theme.colors,
                                  primary25: 'var(--color-brand-600)',
                                  primary: 'var(--color-brand-700)',
                                  neutral0: 'var(--color-grey-0)', // Background color
                                  neutral80: 'var(--color-grey-600)', // Text color
                              },
                          })}

                      />
                  </FormRow>
              <FormRow label='Address' >

                  <Input
                      type='text'
                      value={education || profileData?.education}
                      disabled={isUpdating}
                      onChange={(e) => setEducation(e.target.value)}
                      id='address'
                  />
              </FormRow>

              <FormRow label='Contact number' >

                  <Input
                      type='text'
                      value={education || profileData?.education}
                      disabled={isUpdating}
                      onChange={(e) => setEducation(e.target.value)}
                      id='contactNumber'
                  />
              </FormRow>
          </>
      )
  }

  if(roles.includes("OWNER")){
      forms = (<FormRow label='Address' >

          <Input
              type='text'
              value={education || profileData?.education}
              disabled={isUpdating}
              onChange={(e) => setEducation(e.target.value)}
              id='address'
          />
      </FormRow>)
  }
  return (
      <>
          <Form>
              <FormRow label='Avatar image'>
                  <FileInput

                      id='avatar'
                      accept='image/*'
                        disabled={isUpdatingAvatar}
                      onChange={handleFileChange}
                  />
              </FormRow>

          </Form>
          <Form onSubmit={handleSubmit}>
              <FormRow label='Email address'>
                  <Input disabled value={profileData?.email}/>
              </FormRow>
              <FormRow label='Full name' >

                      <Input
                          type='text'
                          value={fullName || profileData?.fullName}
                          disabled={isUpdating}
                          onChange={(e) => setFullName(e.target.value)}
                          id='fullName'
                      />


              </FormRow>
              {forms}

              <FormRow label="Password">
                  <>
                  <Input
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      disabled={isUpdating}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}

                  />
                  <p style={{color: 'var(--color-grey-500)'}}>*You need to write password to make this changes</p>
              </>
          </FormRow>
          <FormRow>
              <Button onClick={handleCancel} type='reset' variation='secondary'>
                Cancel
            </Button>
            <Button disabled={isUpdating || !password}>Update account</Button>
        </FormRow>

    </Form>

          </>
  );
}

export default UpdateUserDataForm;
