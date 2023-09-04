import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const SimpleCheckBox = (props) => {
  const { mainLabel, secondLabel, id, onChangeOfCheck } = props;

  const handleCheckBoxChange = (event) => {
    onChangeOfCheck(event.target.checked);
  };

  return (
    <div>
      <br></br>
      <Row className="justify-content-md-center">
        <Col>{mainLabel}</Col>
        <Col>
          <Form.Check // prettier-ignore
            type="switch"
            id={id}
            label={secondLabel}
            onChange={handleCheckBoxChange}
          />
        </Col>
      </Row>
    </div>
  );
};
