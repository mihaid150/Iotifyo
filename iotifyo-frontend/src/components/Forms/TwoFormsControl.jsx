import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export const TwoFormsControl = (props) => {
  const {
    label,
    type1,
    type2,
    id1,
    id2,
    placeholder1,
    placeholder2,
    setValue1,
    setValue2,
  } = props;

  return (
    <div>
      <br></br>
      <Row className="justify-content-md-center">
        <Col>{label}</Col>
        <Col>
          <Form.Control
            type={type1}
            id={id1}
            placeholder={placeholder1}
            onChange={(event) => setValue1(event.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type={type2}
            id={id2}
            placeholder={placeholder2}
            onChange={(event) => setValue2(event.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};
