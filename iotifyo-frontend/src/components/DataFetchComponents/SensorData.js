import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { SensorDropdownButton } from "../DrowpdownButtons/SensorDropdownButton";
import { UserSensorTypesDropdownButton } from "../DrowpdownButtons/UserSensorTypesDropdownButton";
import { DateDropdownButton } from "../DrowpdownButtons/DateDropdownButton";
import { SimpleCheckBox } from "../CheckBoxes/SimpleCheckBox";
import LineChart from "../Charts/LineChart";
import { FetchSensorData } from "./FetchSensorData";
import { UpdateGraphData } from "./UpdateGraphData";
import { useState } from "react";
import { FormattedSensorData } from "./FormattedSensorData";
import { DataViewLabel } from "../Labels/DataViewLabel";

export const SensorData = () => {
  const [userSensors, setUserSensors] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const { sensorDates, setSensorDates, userData, setUserData } =
    FormattedSensorData(sensorData);
  const {
    handleOptionDataSelect,
    handleOptionDateSelect,
    handleOptionTypeSelect,
    setIsAutoUpdateGraphChecked,
    isOptionDataSelected,
    isOptionTypeSelected,
    setIsOptionDataSelected,
    optionData,
    optionType,
  } = FetchSensorData(setUserSensors, setSensorData);

  UpdateGraphData(sensorData, setUserData);

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col>Select the sensor</Col>
          <Col>Select the sensor type</Col>
          <Col>Select the day</Col>
        </Row>
        <br></br>
        <Row className="justify-content-md-center">
          <Col>
            <SensorDropdownButton
              dataList={userSensors}
              onOptionDataSelect={handleOptionDataSelect}
            />
          </Col>
          <Col>
            <UserSensorTypesDropdownButton
              isOptionDataSelected={isOptionDataSelected}
              sensorName={optionData}
              onOptionTypeSelected={handleOptionTypeSelect}
            />
          </Col>
          <Col>
            <DateDropdownButton
              datesList={sensorDates}
              onOptionDateSelect={handleOptionDateSelect}
              optionData={optionData}
              optionType={optionType}
              isOptionDataSelected={isOptionDataSelected}
              isOptionTypeSelected={isOptionTypeSelected}
              setSensorDates={setSensorDates}
              setIsOptionDataSelected={setIsOptionDataSelected}
            />
          </Col>
        </Row>
      </Container>
      <SimpleCheckBox
        mainLabel="Auto update the Graph"
        secondLabel="Activate the update"
        id="autoUpdateGraph"
        onChangeOfCheck={setIsAutoUpdateGraphChecked}
      />
      <br></br>
      <LineChart chartData={userData} />
      <DataViewLabel />
    </div>
  );
};
