import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSensors } from "../../hooks/useSensors";
import { useState, useEffect } from 'react';

export const SensorsTypesDropdownButton = (props) => {
  const {sensorType, setSensorType} = props;
  const [sensorsTypes, setSensorsTypes] = useState([]);
  const { getSensorsTypes } = useSensors();

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

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col>Choose the sensor type</Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">{sensorType}</Dropdown.Toggle>
            <Dropdown.Menu>
              {sensorsTypes.map((sensorType, index) => (
                <div key={index}>
                  <Dropdown.Item
                    onClick={() => setSensorType(sensorType.typeName)}
                  >
                    {sensorType.typeName}
                  </Dropdown.Item>
                </div>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};
