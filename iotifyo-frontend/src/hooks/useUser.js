import axios from "axios";
import { AppContext } from "../App";
import { useContext } from "react";
import CryptoJS from "crypto-js";

export const useUser = () => {
  const { encryptionKey, ip } = useContext(AppContext);
  const sessionStorageWindow = window.sessionStorage;

  const getUserEmail = async () => {
    try {
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
        .toString(CryptoJS.enc.Utf8)
        .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await axios.get(`http://${ip}/iotify/user/get-email`, {
        headers: headers,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error getting user email");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateUserEmail = async (newUserEmail) => {
    try {
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
        .toString(CryptoJS.enc.Utf8)
        .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await axios.put(
        `http://${ip}/iotify/user/update-email`,
        {
          credential: newUserEmail,
        },
        {
          headers: headers,
        }
      );
      if (response.status === 201) {
        return response;
      } else {
        console.error("Error updating the email");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const checkPassword = async (password) => {
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
        `http://${ip}/iotify/user/check-password`,
        {
          credential: password,
        },
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error checking the password");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updatePassword = async (password) => {
    try {
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
        .toString(CryptoJS.enc.Utf8)
        .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await axios.put(
        `http://${ip}/iotify/user/update-password`,
        {
          credential: password,
        },
        {
          headers: headers,
        }
      );
      if(response.status === 201) {
        return response;
      } else {
        console.error("Error updating password");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { getUserEmail, updateUserEmail, checkPassword, updatePassword };
};
