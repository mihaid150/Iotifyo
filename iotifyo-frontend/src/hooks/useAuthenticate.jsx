import { AppContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";

const useAuthenticate = () => {
  const [error, setError] = useState(null);
  const { ip } = useContext(AppContext);

  const authenticate = async (authenticateData) => {
    try {
      const response = await axios.post(
        `http://${ip}/iotify/auth/authenticate`,
        authenticateData
      );
      return response.data;
    } catch (error) {
      setError(error.response.status);
      return null;
    }
  };
  return { authenticate, error };
};

export default useAuthenticate;
