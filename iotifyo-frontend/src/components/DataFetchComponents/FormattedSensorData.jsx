import { useState } from 'react';

export const FormattedSensorData = (sensorData) => {
    const [sensorDates, setSensorDates] = useState([
        {
          day: null,
          month: null,
          year: null,
        },
      ]);
    
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

    return { sensorDates, setSensorDates, userData, setUserData};
}