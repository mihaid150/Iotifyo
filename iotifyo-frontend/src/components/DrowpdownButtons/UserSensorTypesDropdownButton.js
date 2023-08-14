import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { useSensors } from "../../hooks/useSensors";

export const UserSensorTypesDropdownButton = (props) => {
  const [selectedSensorType, setSelectedSensorType] =
    useState("Select sensor type");
  const { sensorName, onOptionTypeSelected, isOptionDataSelected } = props;
  const [typeNames, setTypeNames] = useState([]);
  const { getSensorType } = useSensors();

  useEffect(() => {
    const fetchGetSensorType = async (sensorName) => {
      const sensorType = await getSensorType(sensorName);
      const sensorTypeArray = Array.isArray(sensorType)
        ? sensorType
        : [sensorType];
      setTypeNames(sensorTypeArray);
    };
    if (isOptionDataSelected) {
      fetchGetSensorType(sensorName);
    }
  }, [isOptionDataSelected, sensorName, getSensorType]);

  const handleOptionSelect = (option) => {
    setSelectedSensorType(option);
    onOptionTypeSelected(option);
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
