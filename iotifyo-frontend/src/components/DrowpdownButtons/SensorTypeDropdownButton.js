import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { useSensors } from "../../hooks/useSensors";

export const SensorTypeDropdownButton = (props) => {
  const [selectedSensorType, setSelectedSensorType] =
    useState("Select sensor type");
  const { sensorName, onOptionTypeSelected, isOptionDataSelected } = props;
  const [typeNames, setTypeNames] = useState([]);

  const { getSensorType } = useSensors();

  useEffect(() => {
    if (isOptionDataSelected) {
      fetchGetSensorType(sensorName);
    }
  }, [isOptionDataSelected]);

  const handleOptionSelect = (option) => {
    setSelectedSensorType(option);
    onOptionTypeSelected(option);
  };

  const fetchGetSensorType = async (sensorName) => {
    const sensorType = await getSensorType(sensorName);
    const sensorTypeArray = Array.isArray(sensorType)
      ? sensorType
      : [sensorType];
    setTypeNames(sensorTypeArray);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">
        {selectedSensorType}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {typeNames.map((item, index) => (
          <div key={index}>
            <Dropdown.Item
              onClick={() => {
                handleOptionSelect(item);
              }}
            >
              {item}
            </Dropdown.Item>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
