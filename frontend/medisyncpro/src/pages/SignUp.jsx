import styled from "styled-components";
import Logo from "../ui/Logo.jsx";
import Heading from "../ui/Heading.jsx";
import SignupForm from "../features/authentication/SignupForm.jsx";
import UserTypeCard from "../ui/UserTypeCard.jsx";
import {useForm} from "react-hook-form";
import {useState} from "react";

const LoginLayout = styled.main`
  min-height: 100lvh;
  display: grid;
  grid-template-columns: 58rem;
  align-content: center;
  justify-content: center;
  gap: 1rem;
  background-color: var(--color-grey-50);
`;

function Signup() {
    const {register, formState, getValues, setValue, reset, handleSubmit} = useForm();
    const {errors} = formState;
    const [userType, setUserType] = useState(null);

    const handleUserTypeChange = (selectedUserType) => {
        setUserType(selectedUserType);
        setValue("userType", selectedUserType);
    };
    return <LoginLayout>
        <Logo/>

        {!userType && <UserTypeCard onUserTypeChange={handleUserTypeChange}/>}

        {userType && (<> <Heading type="login">Create a new account</Heading>
            <SignupForm type="signup" getValues={getValues} register={register} reset={reset}
                        handleSubmit={handleSubmit} errors={errors}/>
        </>)

        }
    </LoginLayout>;
}

export default Signup;
