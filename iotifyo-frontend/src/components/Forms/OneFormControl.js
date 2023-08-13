import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const OneFormControl = (props) => {

    const {label, type, id, setState, placeholder} = props;

  return (
    <div>
      <br></br>
      <Row className="justify-content-md-center">
        <Col>{label}</Col>
        <Col>
          <Form.Control
            type={type}
            id={id}
            aria-describedby="HelpBlock"
            onChange={(event) => {
              setState(event.target.value);
            }}
            placeholder={placeholder}
          />
        </Col>
      </Row>
    </div>
  );
};
