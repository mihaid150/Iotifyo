import { SensorsTypesDropdownButton } from "../DrowpdownButtons/SensorsTypesDropdownButton";
import { OneFormControl } from "./OneFormControl";
import { SimpleCheckBox } from "../CheckBoxes/SimpleCheckBox";
import { TwoFormsControl } from "./TwoFormsControl";

export const AddSensorFormsGroup = ({
  sensorType,
  setSensorType,
  setSensorName,
  setIsSensorActive,
  setMinimumRangeValue,
  setMaximumRangeValue,
  setUnitOfMeasurement,
  setOtherDetails,
}) => {
  return (
    <div>
      <SensorsTypesDropdownButton
        sensorType={sensorType}
        setSensorType={setSensorType}
      />
      <OneFormControl
        hasSetup={false}
        label="Type the sensor name"
        type="text"
        id="sensorName"
        setState={setSensorName}
        placeholder="Sensor Name"
      />
      <SimpleCheckBox
        mainLabel="Is the sensor active?"
        secondLabel="Activate the sensor"
        id="sensorActive"
        onChangeOfCheck={setIsSensorActive}
      />
      <TwoFormsControl
        label="Values range"
        type1="number"
        type2="number"
        id1="minRangeValue"
        id2="maxRangeValue"
        placeholder1="Minimum Range Value"
        placeholder2="Maximum Range Value"
        setValue1={setMinimumRangeValue}
        setValue2={setMaximumRangeValue}
      />
      <OneFormControl
        hasSetup={false}
        label="Unit of Measurement"
        type="text"
        id="unitOfMeasurement"
        setState={setUnitOfMeasurement}
        placeholder="Unit Of Measurement"
      />
      <OneFormControl
        hasSetup={false}
        label="Any other useful information"
        type="text"
        id="otherDetails"
        setState={setOtherDetails}
        placeholder="Other Details"
      />
      <br></br>
    </div>
  );
};
