import Form from "react-bootstrap/Form";
import { SimpleButton } from "../Buttons/SimpleButton";
import { OneFormControl } from "./OneFormControl";

export const RegisterForm = ({
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  return (
    <>
      <p className="fs-1 fw-bold">Registration Form</p>
      <br></br>
      <OneFormControl
        hasSetup={true}
        type="text"
        id="firstName"
        setState={setFirstName}
        placeholder="First Name"
      />
      <OneFormControl
        hasSetup={true}
        type="text"
        id="lastName"
        setState={setLastName}
        placeholder="Last Name"
      />
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
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
      <br></br>
      <SimpleButton
        variant="medium"
        label="Register"
        handleSubmit={handleSubmit}
      />{" "}
      <div>
        <h6>Already Registered?</h6>
        <a href="/">Authenticate here!</a>
      </div>
      <br></br>
      <br></br>
    </>
  );
};
