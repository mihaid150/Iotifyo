import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import useAuthenticate from "../../hooks/useAuthenticate";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { AuthenticateForm } from "../Forms/AuthenticateForm";
import { ErrorDiv } from "../Labels/ErrorDiv";

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
  };

  useEffect(() => {
    if (error === 403) {
      setErrorDiv(<ErrorDiv errorType='wrongCredentials'/>);
    }
  }, [error]);

  return (
    <>
      <AuthenticateForm
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        errorDiv={errorDiv}
      />
    </>
  );
};
