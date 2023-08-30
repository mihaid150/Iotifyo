import { useEffect, useCallback, useState } from "react";
import { useUserSensors } from "../hooks/useUserSensors";

export const useFetchUserSensors = (setUserSensors) => {
  const { getUserSensors } = useUserSensors();
  const [isFetched, setIsFetched] = useState(false);

  const fetchUserSensors = useCallback(async () => {
    const userSensors = await getUserSensors();
    if (userSensors) {
      const uniqueSensors = userSensors
        .map((sensor) => sensor.sensor.sensorName)
        .filter((value, index, self) => self.indexOf(value) === index);
      setUserSensors(uniqueSensors);
      setIsFetched(true);
    }
  }, [getUserSensors, setUserSensors]);

  useEffect(() => {
    if (!isFetched) {
      fetchUserSensors();
    }
  }, [isFetched, fetchUserSensors]);

  return { fetchUserSensors };
};
