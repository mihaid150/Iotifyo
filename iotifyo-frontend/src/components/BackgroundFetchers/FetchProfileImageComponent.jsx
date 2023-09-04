import { useEffect, useContext } from "react";
import { useAccount } from "../../hooks/useAccount";
import { AppContext } from "../../App";
import { fetchProfileImage } from "./fetchProfileImage";

export const FetchProfileImageComponent = () => {
  const { getProfileImageName } = useAccount();
  const { setProfileImageUrl, isAuthenticated } = useContext(AppContext);

  useEffect(() => {
    fetchProfileImage(getProfileImageName, setProfileImageUrl, isAuthenticated);
  }, [getProfileImageName, setProfileImageUrl, isAuthenticated]);

  return null;
};
