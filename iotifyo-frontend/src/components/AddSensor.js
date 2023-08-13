import Container from "react-bootstrap/Container";
import { useState } from "react";
import { useSensors } from "../hooks/useSensors";
import Button from "react-bootstrap/Button";
import { AddSensorFormsGroup } from "./Forms/AddSensorFormsGroup";

// TODO: Finish the clean code process of this file

export const AddSensor = () => {
  const [sensorType, setSensorType] = useState("Sensor type");
  const [sensorName, setSensorName] = useState("");
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [minimumRangeValue, setMinimumRangeValue] = useState(0.0);
  const [maximumRangeValue, setMaximumRangeValue] = useState(0.0);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [succeedDiv, setSucceedDiv] = useState("");
  const [errorDiv, setErrorDiv] = useState("");

  const { addSensor } = useSensors();

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
  };

  return (
    <div>
      <h4>Sensor Registration</h4>
      <br></br>
      <Container>
        <AddSensorFormsGroup
          sensorType={sensorType}
          setSensorType={setSensorType}
          setSensorName={setSensorName}
          setIsSensorActive={setIsSensorActive}
          setMinimumRangeValue={setMinimumRangeValue}
          setMaximumRangeValue={setMaximumRangeValue}
          setUnitOfMeasurement={setUnitOfMeasurement}
          setOtherDetails={setOtherDetails}
        />
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
