import { useEffect, useRef } from "react";

export const DataAutoFetch = (
  isAutoUpdateGraphChecked,
  optionData,
  optionDate,
  fetchGetData
) => {
  const intervalRef = useRef();

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
    
  }, [fetchGetData, isAutoUpdateGraphChecked, optionData, optionDate]);
};
