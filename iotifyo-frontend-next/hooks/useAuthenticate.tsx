import axios from "axios";
import { useState, useContext } from 'react';

const useAuthenticate = () => {
    const [error, setError] = useState(null);

    const authenticate = async (authenticateData, ip) => {
        try {
            const response = await axios.post(
                `https://${ip}/iotify/auth/authenticate`,
                authenticateData
            );
            return response.data;
        } catch (error) {
            setError(error.response.status);
            return null;
        }
    }

    return { authenticate, error };
}

export default useAuthenticate;