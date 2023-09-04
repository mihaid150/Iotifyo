import { useEffect } from "react";
import { useGetData } from "../../../hooks/useGetData";

// Currently it is not used because the request was moved to the DateDropdownButton component

export const useFetchSensorsDates = (
  optionData,
  optionType,
  isOptionDataSelected,
  isOptionTypeSelected,
  setSensorDates,
  setIsOptionDataSelected
) => {
  const { getDate } = useGetData();

  const fetchSensorsDates = async () => {
    if (optionData !== null) {
      const sensorDates = await getDate(optionData, optionType);
      if (sensorDates) {
        setSensorDates(sensorDates);
      }
    }
  };

  useEffect(() => {
    if (isOptionDataSelected && isOptionTypeSelected) {
      fetchSensorsDates();
      setIsOptionDataSelected(false);
    }
  }, [isOptionDataSelected, isOptionTypeSelected]);

  return { fetchSensorsDates };
};
