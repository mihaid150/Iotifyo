import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Firebase";

export const fetchProfileImage = async (
  getProfileImageName,
  setProfileImageUrl,
  isAuthenticated
) => {
  if (isAuthenticated) {
    const name = await getProfileImageName();
    if (name) {
      const imageRef = ref(storage, `profileImages/${name}`);
      try {
        const url = await getDownloadURL(imageRef);
        setProfileImageUrl(url);
      } catch (error) {
        console.error("Error retrieving profile Image: " + error);
      }
    }
  }
};
