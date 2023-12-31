import axios from "axios";
import { AppContext } from "../App";
import { useContext } from "react";
import CryptoJS from "crypto-js";


export const useUserSpecifications = () => {
  const { encryptionKey, ip, isAuthenticated } = useContext(AppContext);
  const sessionStorageWindow = window.sessionStorage;

  const getUserSpecifications = async () => {
    if(isAuthenticated) {
      try {
        const encryptedToken = sessionStorageWindow.getItem("token");
        const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
          .toString(CryptoJS.enc.Utf8)
          .replace(/"/g, "");
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        };
        const response = await axios.get(`http://${ip}/iotify/user_specs/get`, {
          headers: headers,
        });
  
        if (response.status === 200) {
          return response.data;
        } else {
          console.error("Error getting user specifications");
          return null;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  };

  const updateUserSpecifications = async (firstname, lastname)  => {
    if(isAuthenticated) {
      try {
        const encryptedToken = sessionStorageWindow.getItem("token");
        const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
          .toString(CryptoJS.enc.Utf8)
          .replace(/"/g, "");
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        };
        const response = await axios.post(`http://${ip}/iotify/user_specs/update`, {
          firstname: `${firstname}`,
          lastname: `${lastname}`,
        }, 
        {
          headers: headers
        });
        return response;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }
  return { getUserSpecifications, updateUserSpecifications };
};
