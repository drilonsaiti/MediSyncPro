import {useMutation} from "@tanstack/react-query";
import {signUp} from "../../services/apiAuth.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


export function useSignUp() {
    const navigate = useNavigate();
    const {mutate: signup, isLoading} = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            toast.success("Account successfully created! Please verify the new account from the email address.")
            navigate("/login");
        }
    })

    return {signup, isLoading}
}