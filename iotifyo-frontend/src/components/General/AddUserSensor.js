import { useState, useEffect } from "react";
import { useSensors } from "../../hooks/useSensors";
import { useUserSensors } from "../../hooks/useUserSensors";
import { SensorAssociation } from "../Containers/SensorAssociation";

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

  useEffect(() => {
    const fetchGetSensors = async () => {
      const sensors = await getSensors();
      if (sensors) {
        setSensors(sensors);
      }
    };
    fetchGetSensors();
  }, [getSensors]);

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
      <SensorAssociation
        selectedOption={selectedOption}
        sensors={sensors}
        handleOptionSelect={handleOptionSelect}
        handleAddUserSensor={handleAddUserSensor}
      />
      <br></br>
    </div>
  );
};
