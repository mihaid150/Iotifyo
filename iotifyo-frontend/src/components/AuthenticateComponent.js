import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import Form from "react-bootstrap/Form";
import useAuthenticate from "../hooks/useAuthenticate";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export const AuthenticateComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDiv, setErrorDiv] = useState("");

  const credentials = {
    email: email,
    password: password,
  };

  const { authenticate, error } = useAuthenticate();
  const navigate = useNavigate();
  const sessionStorageWindow = window.sessionStorage;
  const { encryptionKey, setIsAuthenticated } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseToken = await authenticate(credentials);
    if (responseToken) {
      const encryptedToken = CryptoJS.AES.encrypt(
        JSON.stringify(responseToken),
        encryptionKey
      ).toString();
      sessionStorageWindow.setItem("token", encryptedToken);
      //const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, encryptionKey).toString(CryptoJS.enc.Utf8).replace(/"/g, "");
      setIsAuthenticated(true);
      navigate("/home");
    }
    if (error === 403) {
      const errorDiv = (
        <div>
          <br></br>
          <div className="alert alert-danger" role="alert">
            Wrong credentials. Please try again!
          </div>
        </div>
      );
      setErrorDiv(errorDiv);
    }
  };

  useEffect(() => {
    if (error === 403) {
      setErrorDiv(
        <div>
          <br></br>
          <div className="alert alert-danger" role="alert">
            Wrong credentials. Please try again!
          </div>
        </div>
      );
    }
  }, [error]);

  return (
    <>
      <p className="fs-1 fw-bold">Authentication Form</p>
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
      <br></br>
      <br></br>
      <div className="mb-2">
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          Authenticate
        </Button>
      </div>
      <br></br>
      <div>
        <h6>New User?</h6>
        <a href="/register">Register here!</a>
      </div>
      {errorDiv}
    </>
  );
};
