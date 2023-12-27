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
import { HeatIndexFetch } from "./HeatIndexFetch";

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

  const {heatIndex} = HeatIndexFetch();

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
      <br></br>
      <h4>Heat Index?</h4>
      <p>The heat index, also known as the apparent temperature, is what the temperature feels like to the human body when relative humidity is combined with the air temperature. This has important considerations for the human body's comfort. When the body gets too hot, it begins to perspire or sweat to cool itself off.</p>
      <h5>Current heat index for today: {heatIndex.toFixed(2)}/100</h5>
      <p>It is computed as an average for already stored temperature and humidity values</p>
      <p>Formula: 100 - abs(23.88 - temperature) - humidity / 2</p>
      <p>Explanation: 23.88 is considered the desired temperature for a perfect comfort and it computes the absolute difference between this and actual value. Also we subtract the half of humidity as we consider that a higher humidity creates discomfort.</p>
    </div>
  );
};
