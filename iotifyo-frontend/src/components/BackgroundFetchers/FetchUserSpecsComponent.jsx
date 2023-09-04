import { useUserSpecifications } from "../../hooks/useUserSpecifications";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { fetchUserSpecs } from "./fetchUserSpecs";

export const FetchUserSpecsComponent = () => {
  const { setUserSpecs, isAuthenticated, newUserSpecs, setNewUserSpecs } =
    useContext(AppContext);
  const { getUserSpecifications } = useUserSpecifications();

  useEffect(() => {
    fetchUserSpecs(
      isAuthenticated,
      getUserSpecifications,
      setUserSpecs,
      newUserSpecs,
      setNewUserSpecs
    );
  }, [
    isAuthenticated,
    getUserSpecifications,
    setUserSpecs,
    newUserSpecs,
    setNewUserSpecs,
  ]);
};
