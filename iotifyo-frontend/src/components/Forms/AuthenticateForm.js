import { useNavigate } from "react-router-dom";
import { OneFormControl } from "./OneFormControl";
import { SimpleButton } from "../Buttons/SimpleButton";

export const AuthenticateForm = ({
  setEmail,
  setPassword,
  handleSubmit,
  errorDiv,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <p className="fs-1 fw-bold">Authentication Form</p>
      <br></br>
      <OneFormControl
        hasSetup={true}
        type="text"
        id="email"
        setState={setEmail}
        placeholder="Email"
      />
      <OneFormControl
        hasSetup={true}
        type="password"
        id="password"
        setState={setPassword}
        placeholder="Password"
      />
      <SimpleButton
        variant="medium"
        label="Authenticate"
        handleSubmit={handleSubmit}
      />
      <div>
        <h6>New User?</h6>
        <span
          onClick={() => navigate("/register")}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Register here!
        </span>
        <br></br>
        <br></br>
      </div>
      {errorDiv}
    </>
  );
};
