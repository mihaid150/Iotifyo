import { useEffect, useCallback } from "react";
import { useGetData } from "../../../hooks/useGetData";

export const useFetchSensorsData = (
  optionData,
  optionType,
  optionDate,
  isOptionDateSelected,
  isOptionTypeSelected,
  setSensorData,
  setIsOptionDateSelected,
  setIsOptionTypeSelected
) => {
  const { getData } = useGetData();

  const fetchSensorsData = useCallback(async (optionData, optionType, optionDate) => {
    if (
      optionData !== null &&
      optionData !== undefined &&
      optionDate !== undefined &&
      optionType !== undefined
    ) {
      const sensorData = await getData(optionData, optionType, optionDate);
      console.log(sensorData);
      if (sensorData) {
        setSensorData(sensorData);
      }
    }
  }, [getData, setSensorData]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        isOptionDateSelected &&
        isOptionTypeSelected &&
        optionData !== undefined &&
        optionDate !== undefined &&
        optionType !== undefined
      ) {
        await fetchSensorsData(optionData, optionType, optionDate);
        setIsOptionDateSelected(false);
        setIsOptionTypeSelected(false);
      }
    };

    fetchData();
  }, [
    isOptionDateSelected,
    isOptionTypeSelected,
    optionData,
    optionDate,
    optionType,
    fetchSensorsData,
    setIsOptionDateSelected,
    setIsOptionTypeSelected,
  ]);

  return { fetchSensorsData };
};
