import { DataAutoFetch } from "./DataAutoFetch";
import { useEffect, useState } from "react";
import { useFetchUserSensors } from "../../fetchers/useFetchUserSensors";
import { useFetchSensorsData } from "../../fetchers/useFetchSensorsData";

export const FetchSensorData = (
  setUserSensors,
  setSensorData
) => {
  const [optionData, setOptionData] = useState("");
  const [optionType, setOptionType] = useState("");
  const [optionDate, setOptionDate] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [isOptionDataSelected, setIsOptionDataSelected] = useState(false);
  const [isOptionDateSelected, setIsOptionDateSelected] = useState(false);
  const [isOptionTypeSelected, setIsOptionTypeSelected] = useState(false);
  const [isAutoUpdateGraphChecked, setIsAutoUpdateGraphChecked] =
    useState(false);
  const { fetchUserSensors } = useFetchUserSensors(setUserSensors);
  const { fetchSensorsData } = useFetchSensorsData(
    optionData,
    optionType,
    optionDate,
    isOptionDateSelected,
    isOptionTypeSelected,
    setSensorData,
    setIsOptionDateSelected,
    setIsOptionTypeSelected
  );

  useEffect(() => {
    fetchUserSensors();
  }, [fetchUserSensors]);
  useEffect(() => {
    fetchSensorsData();
  }, [fetchSensorsData, isOptionDateSelected, isOptionTypeSelected]);

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
  DataAutoFetch(
    isAutoUpdateGraphChecked,
    optionData,
    optionDate,
    fetchSensorsData
  );

  return {
    handleOptionDataSelect,
    handleOptionDateSelect,
    handleOptionTypeSelect,
    setIsAutoUpdateGraphChecked,
    isOptionDataSelected,
    isOptionTypeSelected,
    setIsOptionDataSelected,
    optionData,
    optionType
  };
};
