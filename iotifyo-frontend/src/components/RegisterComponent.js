import { useState } from "react";
import useRegister from "../hooks/useRegister";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
      console.log(responseToken);
    }
  };

  return (
    <>
      <p className="fs-1 fw-bold">Registration Form</p>
      <br></br>
      <div
        style={{ maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}
      >
        <Form.Control
          type="text"
          id="firstName"
          aria-describedby="firstNameHelpBlock"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          placeholder="First Name"
        />
      </div>
      <br></br>
      <div
        style={{ maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}
      >
        <Form.Control
          type="text"
          id="lastName"
          aria-describedby="lastNameHelpBlock"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          placeholder="Last Name"
        />
      </div>
      <br></br>
      <div
        style={{ maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}
      >
        <Form.Control
          type="email"
          id="inputEmail"
          aria-describedby="emailHelpBlock"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Email"
        />
      </div>
      <br></br>
      <div
        style={{ maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}
      >
        <Form.Control
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
        />
      </div>
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
      <br></br>
      <br></br>
      <div className="mb-2">
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          Register
        </Button>
      </div>
      <br></br>
      <div>
        <h6>Already Registered?</h6>
        <a href="/">Authenticate here!</a>
      </div>
    </>
  );
};
