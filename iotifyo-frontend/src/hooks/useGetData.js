import axios from "axios";
import { AppContext } from "../App";
import { useContext } from "react";
import CryptoJS from "crypto-js";

export const useGetData = () => {
  const { encryptionKey, ip } = useContext(AppContext);
  const sessionStorageWindow = window.sessionStorage;

  const getData = async (sensorName, typeName, date) => {
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
        `http://${ip}/iotify/${typeName}/${sensorName}/get-data/${date}`,
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error getting sensor data");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getDate = async (sensorName, typeName) => {
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
        `http://${ip}/iotify/${typeName}/${sensorName}/get-date`,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error getting sensor data");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return { getData, getDate };
};
