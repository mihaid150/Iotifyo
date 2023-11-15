import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import { SimpleButton } from "../Buttons/SimpleButton";

export const SensorAssociation = (props) => {
  const { selectedOption, sensors, handleOptionSelect, handleAddUserSensor } =
    props;

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col>Associate with your account a new sensor</Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="secondary">
                {selectedOption}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {sensors.map((sensor, index) => (
                  <div key={index}>
                    <Dropdown.Item onClick={() => handleOptionSelect(sensor)}>
                      {sensor.sensor.sensorName}{" "}
                      {sensor.sensor.sensorType.typeName}
                    </Dropdown.Item>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <SimpleButton
              variant="small"
              label="Add"
              handleSubmit={handleAddUserSensor}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
