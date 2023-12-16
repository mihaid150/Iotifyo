import { useState } from 'react';
import useAuthenticate from "@/hooks/useAuthenticate";

const SignInLogic = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { authenticate } = useAuthenticate()


    const credentials = {
        email: email,
        password: password
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        console.log(credentials)
    };

    return {email, setEmail, password, setPassword, error, handleSignIn};
};

export default SignInLogic;