import axios from "axios";
import { AppContext } from "../App";
import { useContext } from "react";
import CryptoJS from "crypto-js";

export const useUserSensors = () => {
  const { encryptionKey, ip } = useContext(AppContext);
  const sessionStorageWindow = window.sessionStorage;

  const getUserSensors = async () => {
    try {
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
        .toString(CryptoJS.enc.Utf8)
        .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await axios.get(`http://${ip}/iotify/user-sensor/get`, {
        headers: headers,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error getting user sensors");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const addUserSensor = async (sensorName, typeName) => {
    try {
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
        .toString(CryptoJS.enc.Utf8)
        .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };

      const sensorJSON = {
        sensorName: sensorName,
        typeName: typeName,
      };

      const response = await axios.post(
        `http://${ip}/iotify/user-sensor/save`,
        sensorJSON,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { getUserSensors, addUserSensor };
};
