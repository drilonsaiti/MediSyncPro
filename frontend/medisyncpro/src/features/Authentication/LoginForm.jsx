import {useState} from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useLogin} from "./useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import {useQueryClient} from "@tanstack/react-query";
import {Link, useNavigate} from "react-router-dom";
import {P} from "../../ui/Pagination.jsx";
import styled from "styled-components";
import {FaHouseMedical} from "react-icons/fa6";
import Heading from "../../ui/Heading.jsx";

const Container = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`
const Card = styled.div`
    background-color: var(--color-grey-0);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-bottom: 1.5rem;
    width: 100%;
    cursor: pointer;
    text-align: center;

    p {
        color: var(--color-grey-1000);
        line-height: 1.6;
        width: 100%;
    }

    &:hover {
        outline: 2px solid var(--color-brand-700);
    }
`;
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    /*const {register,formState,getValues,reset,handleSubmit} = useForm();
    const {errors} = formState;*/
    const {login, isLoading, data} = useLogin();
    const queryClient = useQueryClient();

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        login(data, {
            onSettled: () => {
                setEmail('')
                setPassword('')
            }
        })

    }

    const handleLogin = (email,password) => {
        const data = {
            email: email,
            password: password
        }
        login(data)
    }

    const navigate = useNavigate();
    return (<>
            <Heading type="h4">Choose a user type for testing:</Heading>
        <Container>

            <Card onClick={() => handleLogin("clinic@clinic.com","Clinic123")}>
                    <Heading type="h3">Clinic</Heading>
            </Card>
            <Card onClick={() => handleLogin("doctor@doctor.com","Doctor123")}>
                <Heading type="h3">Doctor</Heading>
            </Card>
            <Card onClick={() => handleLogin("patient@patient.com","Patient123")}>
                <Heading type="h3">Patient</Heading>
            </Card>
            <Card onClick={() => handleLogin("receptionist@receptionist.com","Receptionist123")}>
                <Heading type="h3">Receptionist</Heading>
            </Card>
        </Container>
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address" orientation="vertical">
                <Input
                    type="email"
                    id="email"
                    autoComplete="username"
                    value={email}
                    disabled={isLoading}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRow>
            <FormRow label="Password" orientation="vertical">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
            </FormRow>
            <FormRow orientation="vertical">
                <Button disabled={isLoading} size="large">{!isLoading ? "Log in" : <SpinnerMini/>}</Button>
            </FormRow>
            <P style={{textAlign: "center", marginTop: "2rem"}}>No account? <Link
                style={{color: "var(--color-brand-600)", fontSize: "2rem"}} replace to="/signup">Sign up</Link></P>


        </Form>
        </>
    );
}

export default LoginForm;
