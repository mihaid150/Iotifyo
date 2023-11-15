import Container from "react-bootstrap/Container";
import { useState } from "react";
import { useSensors } from "../../hooks/useSensors";
import { SimpleButton } from "../Buttons/SimpleButton";
import { AddSensorFormsGroup } from "../Forms/AddSensorFormsGroup";
import { ErrorDiv } from "../Labels/ErrorDiv";
import { SucceedDiv } from "../Labels/SucceedDiv";

export const AddSensor = () => {
  const [sensorType, setSensorType] = useState("Sensors type");
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
      setSucceedDiv(<SucceedDiv succeedType="sensorSaved" />);
    } else {
      setErrorDiv(<ErrorDiv errorType="sensorNotSaved" />);
    }
  };

  return (
    <div>
      <h4>Sensors Registration</h4>
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
      <SimpleButton
        variant="small"
        label="Add Sensors"
        handleSubmit={handleAddSensor}
      />
      <br></br>
      <br></br>
      {succeedDiv}
      {errorDiv}
    </div>
  );
};
