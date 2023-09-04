import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const DataViewLabel = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          *First you have to select the sensor type and then the day you want
        </Col>
      </Row>
    </Container>
  );
};
