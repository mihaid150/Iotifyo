import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { useSensors } from "../hooks/useSensors";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const AddSensor = () => {
  const [sensorsTypes, setSensorsTypes] = useState([]);

  const [sensorType, setSensorType] = useState("Sensor type");
  const [sensorName, setSensorName] = useState("");
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [minimumRangeValue, setMinimumRangeValue] = useState(0.0);
  const [maximumRangeValue, setMaximumRangeValue] = useState(0.0);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const [succeedDiv, setSucceedDiv] = useState("");
  const [errorDiv, setErrorDiv] = useState("");

  const { getSensorsTypes, addSensor } = useSensors();

  const fetchGetSensorsTypes = async () => {
    const sensorTypes = await getSensorsTypes();
    if (sensorTypes) {
      setSensorsTypes(sensorTypes);
    }
  };

  useEffect(() => {
    fetchGetSensorsTypes();
    // eslint-disable-next-line
  }, []);

  const handleAddSensorType = (option) => {
    setSensorType(option);
    console.log(sensorType);
  };

  const handleAddSensor = async (e) => {
    e.preventDefault();

    const isActive = isSensorActive === "on" ? true : false;

    const sensor = {
      sensorType: sensorType,
      sensorName: sensorName,
      isActive: isActive,
      minimumRange: minimumRangeValue,
      maximumRange: maximumRangeValue,
      unitOfMeasurement: unitOfMeasurement,
      otherDetails: otherDetails,
    };

    const response = await addSensor(sensor);
    if (response.status === 200 || response.status === 201) {
      setSucceedDiv(
        <div>
          <br></br>
          <div>Sensor saved</div>
        </div>
      );
    } else {
      setErrorDiv(
        <div>
          <br></br>
          <div>Sensor not saved</div>
        </div>
      );
    }
    console.log(sensor);
  };

  return (
    <div>
      <h4>Sensor Registration</h4>
      <br></br>
      <Container>
        <Row className="justify-content-md-center">
          <Col>Choose the sensor type</Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="secondary">
                {sensorType}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {sensorsTypes.map((sensorType, index) => (
                  <div key={index}>
                    <Dropdown.Item
                      onClick={() => handleAddSensorType(sensorType.typeName)}
                    >
                      {sensorType.typeName}
                    </Dropdown.Item>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <br></br>
        <Row className="justify-content-md-center">
          <Col>Type the sensor name</Col>
          <Col>
            <Form.Control
              type="text"
              id="sensorName"
              aria-describedby="sensorNameHelpBlock"
              onChange={(event) => {
                setSensorName(event.target.value);
              }}
              placeholder="Sensor Name"
            />
          </Col>
        </Row>
        <br></br>
        <Row className="justify-content-md-center">
          <Col>Is the sensor active?</Col>
          <Col>
            <Form.Check
              type="switch"
              id="isActiveSensor"
              label="Activate the sensor"
              onChange={(event) => setIsSensorActive(event.target.value)}
            />
          </Col>
        </Row>
        <br></br>
        <Row className="justify-content-md-center">
          <Col>Values range</Col>
          <Col>
            <Form.Control
              type="number"
              step="0.01"
              id="minimumRangeValue"
              placeholder="Minimum Range Value"
              onChange={(event) => setMinimumRangeValue(event.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              id="maximumRangeValue"
              placeholder="Maximum Range Value"
              onChange={(event) => setMaximumRangeValue(event.target.value)}
            />
          </Col>
        </Row>
        <br></br>
        <Row className="justify-content-md-center">
          <Col>Unit of Measurement</Col>
          <Col>
            <Form.Control
              type="text"
              id="unitOfMeasurement"
              aria-describedby="unitOfMeasurementHelpBlock"
              onChange={(event) => {
                setUnitOfMeasurement(event.target.value);
              }}
              placeholder="Unit of Measurement"
            />
          </Col>
        </Row>
        <br></br>
        <Row className="justify-content-md-center">
          <Col>Any other useful information</Col>
          <Col>
            <Form.Control
              type="text"
              id="otherDetails"
              aria-describedby="otherDetailsHelpBlock"
              onChange={(event) => {
                setOtherDetails(event.target.value);
              }}
              placeholder="Other Details"
            />
          </Col>
        </Row>
        <br></br>
      </Container>
      <Button variant="primary" size="sm-10" onClick={handleAddSensor}>
        Add Sensor
      </Button>
      <br></br>
      <br></br>
      {succeedDiv}
      {errorDiv}
    </div>
  );
};
