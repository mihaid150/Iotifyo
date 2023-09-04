import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { OneFormControl } from "../Forms/OneFormControl";
import { useState, useEffect } from "react";
import { SimpleButton } from "../Buttons/SimpleButton";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export const PasswordComponent = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { checkPassword, updatePassword } = useUser();
  const [password, setPassword] = useState("Password");
  const navigate = useNavigate();
  const sessionStorageWindow = window.sessionStorage;

  useEffect(() => {
    if (!isFetched && isChecked && password) {
      const fetchPassword = async () => {
        
        const response = await checkPassword(password);
        if (response) {
          setIsFetched(true);
          alert(
            "Typed password is corresponding with the actual password.\nNow type the wanted password."
          );
        }
      };
      fetchPassword();
    }
  }, [isFetched, checkPassword, password, isChecked]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      setIsChecked(true);
    } else if (isFetched && isChecked) {
      const response = await updatePassword(password);
      if (response.status === 201) {
        alert("Password updated successfully");
        sessionStorageWindow.removeItem("token");
        navigate("/");
      } else {
        alert("Password not updated successfully");
      }
    }
  };
  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>Password</span>
        </Col>
        <Col>
          <OneFormControl
            type="password"
            id="password"
            setState={setPassword}
            placeholder=''
            hasSetup={true}
          />
        </Col>
        <Col>
          <SimpleButton
            variant="medium"
            label={!isChecked ? "Check Password" : "Update Password"}
            handleSubmit={handleUpdate}
          />
        </Col>
      </Row>
    </>
  );
};
