import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { OneFormControl } from "../Forms/OneFormControl";
import { useState } from "react";
import { SimpleButton } from "../Buttons/SimpleButton";

export const EmailComponent = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>Email</span>
        </Col>
        <Col>
          <OneFormControl
            type="text"
            id="email"
            setState={setEmail}
            placeholder={email}
            hasSetup={true}
          />
        </Col>
        <Col>
          <SimpleButton
            variant="medium"
            label="Change Email"
            handleSubmit={setEmail}
          />
        </Col>
      </Row>
    </>
  );
};
