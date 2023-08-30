import { useMail } from "../../hooks/useMail";
import Container from "react-bootstrap/Container";
import { OneFormControl } from "../Forms/OneFormControl";
import { SimpleButton } from "../Buttons/SimpleButton";
import { useState } from "react";
import { SucceedDiv } from "../Labels/SucceedDiv";
import { ErrorDiv } from "../Labels/ErrorDiv";

export const ContactUsComponent = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [succeedDiv, setSucceedDiv] = useState("");
  const [errorDiv, setErrorDiv] = useState("");
  const { sendMail } = useMail();

  const handleSendEmail = async (e) => {
    e.preventDefault();

    const response = await sendMail(subject, message);
    if(response.status === 201) {
        setSucceedDiv(<SucceedDiv succeedType="mailSent" />)
    } else {
        setErrorDiv(<ErrorDiv errorType="mailNotSent" />);
    }
  };

  return (
    <div>
      <Container>
        <h4>Contact Us</h4>
        <br></br>
        <OneFormControl
          hasSetup={false}
          type="text"
          id="subject"
          setState={setSubject}
          placeholder="Subject"
          label="Subject"
        />
        <OneFormControl
          hasSetup={false}
          type="text"
          id="message"
          setState={setMessage}
          placeholder="Message"
          label="Message"
        />
        <SimpleButton
          variant="medium"
          label="Send Email"
          handleSubmit={handleSendEmail}
        />
      </Container>
      <br></br>
      <br></br>
      {succeedDiv}
      {errorDiv}
    </div>
  );
};
