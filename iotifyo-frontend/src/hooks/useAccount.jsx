import axios from "axios";
import { AppContext } from "../App";
import { useContext } from "react";
import CryptoJS from "crypto-js";

export const useAccount = () => {
  const { encryptionKey, ip } = useContext(AppContext);
  const sessionStorageWindow = window.sessionStorage;

  const saveProfileImageName = async (profileImageName) => {
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
        `http://${ip}/iotify/account/save-profile-image-name`,
        profileImageName,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        return response;
      } else {
        console.error("Error saving the profile image name");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getProfileImageName = async () => {
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
        `http://${ip}/iotify/account/get-profile-image-name`,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error getting the profile image name");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getAllAccounts = async () => {
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
          `http://${ip}/iotify/account/get-all-accounts`,
          {
            headers: headers,
          }
      );
      if(response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        console.error("Error getting all accounts");
        return null;
      }
    } catch (error) {
      console.error("Error getting all accounts");
      return null;
    }
  }

  const activateAccount = async (username) => {
    try{
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
          .toString(CryptoJS.enc.Utf8)
          .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await axios.post(
          `http://${ip}/iotify/account/activate-account`,
          username,
          {
            headers: headers,
          }
      );
      if (response.status === 200 || response.status === 201) {
        return response;
      } else {
        console.error("Error activating the account");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const deactivateAccount = async (username) => {
    try{
      const encryptedToken = sessionStorageWindow.getItem("token");
      const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
          .toString(CryptoJS.enc.Utf8)
          .replace(/"/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await axios.post(
          `http://${ip}/iotify/account/deactivate-account`,
          username,
          {
            headers: headers,
          }
      );
      if (response.status === 200 || response.status === 201) {
        return response;
      } else {
        console.error("Error deactivating the account");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return { saveProfileImageName, getProfileImageName, getAllAccounts, activateAccount, deactivateAccount };
};
