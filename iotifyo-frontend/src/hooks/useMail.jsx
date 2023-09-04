import axios from 'axios';
import { AppContext } from '../App';
import { useContext } from 'react';
import CryptoJS from 'crypto-js';

export const useMail = () => {
    const { encryptionKey, ip } = useContext(AppContext);
    const sessionStorageWindow = window.sessionStorage;

    const sendMail = async (subject, message) => {
        const mailRequest = {
            userEmails: true,
            recipientMail: "iotifyoapp@gmail.com",
            subject: subject,
            message: message
        }
        try{
            const encryptedToken = sessionStorageWindow.getItem('token');
            const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey)
                .toString(CryptoJS.enc.Utf8)
                .replace(/"/g, "");
            const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            };

            const response = await axios.post(`http://${ip}/iotify/mail/send`,
                mailRequest, {
                    headers: headers,
                }
            );
            if(response.status === 201) {
                return response;
            } else {
                console.error("Error sending the mail");
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return { sendMail };
}