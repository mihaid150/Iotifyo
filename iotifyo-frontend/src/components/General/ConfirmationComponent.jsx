import { useState } from "react";
import { OneFormControl } from "../Forms/OneFormControl";
import { SimpleButton } from "../Buttons/SimpleButton";
import { useConfirmation } from "../../hooks/useConfirmation";
import { useNavigate } from "react-router-dom";

export const ConfirmationComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { confirm } = useConfirmation();
  const navigate = useNavigate();
  const handleConfirmation = async (e) => {
    e.preventDefault();

    const confirmData = {
      email: email,
      password: password,
    };

    const responseToken = await confirm(confirmData);
    if (responseToken) {
      navigate("/");
    }
  };

  return (
    <>
      <h2>Confirm your account here!</h2>
      <OneFormControl
        label="Email"
        type="text"
        id="email"
        setState={setEmail}
        placeholder="Email"
        hasSetup={true}
      />
      <OneFormControl
        label="Password"
        type="password"
        id="password"
        setState={setPassword}
        placeholder="Password"
        hasSetup={true}
      />
      <SimpleButton
        variant="medium"
        label="Confirm"
        handleSubmit={handleConfirmation}
      />
    </>
  );
};
