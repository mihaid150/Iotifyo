import { useEffect, useCallback } from "react";
import { useUserSensors } from "../hooks/useUserSensors";

export const useFetchUserSensors = (setUserSensors) => {
  const { getUserSensors } = useUserSensors();

  const fetchUserSensors = useCallback(async () => {
    const userSensors = await getUserSensors();
    if (userSensors) {
      const uniqueSensors = userSensors
        .map((sensor) => sensor.sensor.sensorName)
        .filter((value, index, self) => self.indexOf(value) === index);
      setUserSensors(uniqueSensors);
    }
  },[getUserSensors, setUserSensors]);

  useEffect(() => {
    fetchUserSensors();
  }, [fetchUserSensors]);

  return { fetchUserSensors };
};
