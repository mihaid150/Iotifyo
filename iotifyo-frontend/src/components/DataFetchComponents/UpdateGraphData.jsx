import { useEffect } from "react";

export const UpdateGraphData = (sensorData, setUserData) => {
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
  }, [sensorData, setUserData]);
};
