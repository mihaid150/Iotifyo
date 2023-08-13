import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { useSensors } from "../hooks/useSensors";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useUserSensors } from "../hooks/useUserSensors";

export const AddUserSensor = () => {
  const [selectedOption, setSelectedOption] = useState("Select a sensor");
  const [sensors, setSensors] = useState([]);
  const { getSensors } = useSensors();
  const { addUserSensor } = useUserSensors();

  const handleOptionSelect = (option) => {
    setSelectedOption(
      option.sensor.sensorName + " " + option.sensor.sensorType.typeName
    );
  };

  const fetchGetSensors = async () => {
    const sensors = await getSensors();
    if (sensors) {
      setSensors(sensors);
    }
  };

  useEffect(() => {
    fetchGetSensors();
    // eslint-disable-next-line
  }, []);

  const handleAddUserSensor = async (e) => {
    e.preventDefault();
    const parts = selectedOption.split(" ");
    if (parts.length === 2) {
      addUserSensor(parts[0], parts[1]);
    }
  };

  return (
    <div>
      <h4>Sensor Association</h4>
      <br></br>
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
            <Button
              variant="primary"
              size="sm-10"
              onClick={handleAddUserSensor}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Container>
      <br></br>
    </div>
  );
};
