import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { OneFormControl } from "../Forms/OneFormControl";
import { useState, useEffect } from "react";
import { SimpleButton } from "../Buttons/SimpleButton";
import { useUser } from '../../hooks/useUser';
import { useNavigate } from "react-router-dom";

export const EmailComponent = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [email, setEmail] = useState("");
  const { getUserEmail, updateUserEmail } = useUser();
  const navigate = useNavigate();
  const sessionStorageWindow = window.sessionStorage;

  

  useEffect(() => {
    if(!isFetched) {
      const fetchUserEmail = async () => {
        const userEmail = await getUserEmail();
        if(userEmail) {
          setEmail(userEmail);
          setIsFetched(true);
        }
      }
      fetchUserEmail();
    }
  },[getUserEmail, isFetched, email]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if(email) {
      const response = await updateUserEmail(email);
      if(response.status === 201) {
        alert("Email updated to " + email + ".\nYou will be redirected to authentication page.");
        sessionStorageWindow.removeItem('token');
        navigate("/");
      } else {
        alert("Email not updated");
      }
    }
  }

  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>Email</span>
        </Col>
        <Col>
          <OneFormControl
            type="text"
            id="emailUpdate"
            setState={setEmail}
            placeholder={email}
            hasSetup={true}
          />
        </Col>
        <Col>
          <SimpleButton
            variant="medium"
            label="Change Email"
            handleSubmit={handleUpdate}
          />
        </Col>
      </Row>
    </>
  );
};
