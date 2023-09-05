import { useState } from "react";
import useRegister from "../../hooks/useRegister";
import { RegisterForm } from "../Forms/RegisterForm";

export const RegisterComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const credentials = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: password,
  };
  const { register } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseToken = await register(credentials);
    if (responseToken) {
      alert("Your account was created. We have sent you a confirmation email.");
    }
  };

  return (
    <>
      <RegisterForm
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
