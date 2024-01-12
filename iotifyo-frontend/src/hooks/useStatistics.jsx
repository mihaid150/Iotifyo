import axios from 'axios';
import { AppContext } from '../App';
import { useContext } from 'react';
import CryptoJS from "crypto-js";

export const useStatistics = () => {
    const { encryptionKey, ip } = useContext(AppContext);
    const sessionStorageWindow = window.sessionStorage;

    const getHeatIndex = async (date) => {
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
                `http://${ip}/iotify/statistics/get-heat-index/${date}`,
                {
                    headers: headers,
                }
            );
            if (response.status === 200) {
                return response.data;
            } else {
                console.error("Error getting heat index")
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    return {getHeatIndex}
}