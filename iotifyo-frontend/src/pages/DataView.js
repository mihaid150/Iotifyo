import { useState, useRef, useEffect } from "react";
import { useGetData } from "../hooks/useGetData";
import { useUserSensors } from "../hooks/useUserSensors";
import { SensorDropdownButton } from "../components/SensorDropdownButton";
import { SensorTypeDropdownButton } from "../components/SensorTypeDropdownButton";
import { DateDropdownButton } from "../components/DateDropdownButton";
import LineChart from "../components/LineChart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AutoCheckBox from "../components/AutoCheckBox";

export const DataView = () => {
  const [optionData, setOptionData] = useState("");
  const [optionType, setOptionType] = useState("");
  const [optionDate, setOptionDate] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [userSensors, setUserSensors] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [sensorDates, setSensorDates] = useState([
    {
      day: null,
      month: null,
      year: null,
    },
  ]);
  const [isOptionDataSelected, setIsOptionDataSelected] = useState(false);
  const [isOptionDateSelected, setIsOptionDateSelected] = useState(false);
  const [isOptionTypeSelected, setIsOptionTypeSelected] = useState(false);
  const [isAutoUpdateGraphChecked, setIsAutoUpdateGraphChecked] =
    useState(false);

  const intervalRef = useRef();

  const [userData, setUserData] = useState({
    labels: sensorData.map((data) => data.dateTime),
    datasets: [
      {
        label: "Dallas Temperature",
        data: sensorData.map((data) => data.temperature),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const { getUserSensors } = useUserSensors();
  const { getData, getDate } = useGetData();

  const fetchUserSensors = async () => {
    const userSensors = await getUserSensors();
    if (userSensors) {
      const uniqueSensors = userSensors
        .map((sensor) => sensor.sensor.sensorName)
        .filter((value, index, self) => self.indexOf(value) === index);
      setUserSensors(uniqueSensors);
    }
  };

  const fetchGetData = async (optionData, optionType, optionDate) => {
    if (optionData !== null) {
      const sensorData = await getData(optionData, optionType, optionDate);
      if (sensorData) {
        setSensorData(sensorData);
      }
    }
  };

  const fetchGetDate = async (optionData, typeName) => {
    if (optionData !== null) {
      const sensorDates = await getDate(optionData, typeName);
      if (sensorDates) {
        setSensorDates(sensorDates);
      }
    }
  };

  useEffect(() => {
    fetchUserSensors();
    // eslint-disable-next-line
  }, []);

  const handleOptionDataSelect = async (selectedOption) => {
    setOptionData(selectedOption);
    setIsOptionDataSelected(true);
  };

  const handleOptionDateSelect = async (selectedOption) => {
    setOptionDate(selectedOption);
    setIsOptionDateSelected(true);
  };

  const handleOptionTypeSelect = async (selectedOption) => {
    setOptionType(selectedOption);
    setIsOptionTypeSelected(true);
  };

  useEffect(() => {
    if (isOptionDataSelected && isOptionTypeSelected) {
      fetchGetDate(optionData, optionType);
      setIsOptionDataSelected(false);
    }
    // eslint-disable-next-line
  }, [isOptionDataSelected, isOptionTypeSelected]);

  useEffect(() => {
    if (isOptionDateSelected && isOptionTypeSelected) {
      fetchGetData(optionData, optionType, optionDate);
      console.log(optionDate);
      setIsOptionDateSelected(false);
      setIsOptionTypeSelected(false);
    }

    // eslint-disable-next-line
  }, [isOptionDateSelected, isOptionTypeSelected]);

  useEffect(() => {
    // Create a new userData object with updated values based on sensorData

    const newUserData = {
      labels: sensorData.map(({ dateTime }) => dateTime),
      datasets: [
        {
          label: "Values",
          data: sensorData.map(({ value }) => value),
          backgroundColor: "red",
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };

    // Set the newUserData
    setUserData(newUserData);
  }, [sensorData]);

  useEffect(() => {
    if (isAutoUpdateGraphChecked) {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
      }

      // Set interval to fetch new data every 60 seconds
      intervalRef.current = setInterval(() => {
        if (optionDate.day !== null && optionData !== "") {
          fetchGetData(optionData, optionDate);
        }
      }, 60 * 1000); // 60 * 1000 milliseconds = 1 minute

      // Clear interval when component unmounts or isAutoUpdateGraphChecked becomes false
      return () => clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line
  }, [isAutoUpdateGraphChecked, optionData, optionDate]);

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col>Select the sensor</Col>
          <Col>Select the sensor type</Col>
          <Col>Select the day</Col>
          <Col></Col>
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
            <SensorTypeDropdownButton
              isOptionDataSelected={isOptionDataSelected}
              sensorName={optionData}
              onOptionTypeSelected={handleOptionTypeSelect}
            />
          </Col>
          <Col>
            <DateDropdownButton
              datesList={sensorDates}
              onOptionDateSelect={handleOptionDateSelect}
            />
          </Col>
          <Col>
            <AutoCheckBox onChangeOfCheck={setIsAutoUpdateGraphChecked} />
          </Col>
        </Row>
      </Container>
      <br></br>
      <LineChart chartData={userData} />
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            *First you have to select the sensor type and then the day you want
          </Col>
        </Row>
      </Container>
      <br></br>
    </div>
  );
};
