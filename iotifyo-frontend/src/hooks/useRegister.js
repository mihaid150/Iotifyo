import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

const useRegister = () => {
  const [error, setError] = useState(null);
  const { ip } = useContext(AppContext);

  const register = async (registerData) => {
    try {
      const response = await axios.post(
        `http://${ip}/iotify/auth/register`,
        registerData
      );
      return response.data.token;
    } catch (error) {
      setError(error.response.data.message);
      return null;
    }
  };
  return { register, error };
};

export default useRegister;
