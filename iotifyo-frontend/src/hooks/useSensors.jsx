import axios from "axios";
import { AppContext } from "../App";
import { useContext } from "react";
import CryptoJS from "crypto-js";

export const useSensors = () => {
  const { encryptionKey, ip } = useContext(AppContext);
  const sessionStorageWindow = window.sessionStorage;

  const getSensors = async () => {
    try {
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
        .toString(CryptoJS.enc.Utf8)
        .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await axios.get(`http://${ip}/iotify/sensor/get`, {
        headers: headers,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error getting sensors");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getSensorsTypes = async () => {
    try {
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
        .toString(CryptoJS.enc.Utf8)
        .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await axios.get(
        `http://${ip}/iotify/sensors-types/get`,
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error getting sensors types");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getSensorType = async (sensorName) => {
    try {
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
        .toString(CryptoJS.enc.Utf8)
        .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await axios.get(
        `http://${ip}/iotify/sensor/${sensorName}/get-type`,
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error getting sensors type");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const addSensor = async (sensor) => {
    try {
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
        .toString(CryptoJS.enc.Utf8)
        .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };

      const response = await axios.post(
        `http://${ip}/iotify/sensor/save`,
        sensor,
        {
          headers: headers,
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const addSensorType = async (type) => {
    try {
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
          .toString(CryptoJS.enc.Utf8)
          .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };

      const response = await axios.post(
          `http://${ip}/iotify/sensors-types/save`,
          type,
          {
            headers: headers,
          }
      );
      if (response.status === 201) {
        return response;
      } else {
        console.error("Error getting sensors type");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { getSensors, getSensorsTypes, addSensor, getSensorType, addSensorType };
};
