import { AppContext } from "../App";
import { useContext } from "react";
import axios from "axios";

export const useConfirmation = () => {
  const { ip } = useContext(AppContext);

  const confirm = async (confirmData) => {
    try {
      const response = await axios.post(
        `http://${ip}/iotify/auth/confirmation`,
        confirmData
      );
      return response.data.token;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return { confirm };
};
