import { useState, useContext, useEffect } from "react";
import { storage } from "../../Firebase";
import { ref, uploadBytes} from "firebase/storage";
import { v4 } from "uuid";
import { useAccount } from "../../hooks/useAccount";
import { AppContext } from "../../App";

export const ProfileComponent = () => {
  const [profileImageUpload, setProfileImageUpload] = useState(null);
  const { saveProfileImageName} = useAccount();
  const { profileImageUrl } = useContext(AppContext);

  useEffect(() => {
    const imgElement = document.getElementById("myImageElement");
          if (imgElement) {
            imgElement.src = profileImageUrl;
          }
  },[])

  const uploadProfileImage = () => {
    if (profileImageUpload == null) {
      return;
    } else {
      const name = profileImageUpload.name + v4();
      saveProfileImageName(name);
      const imageRef = ref(storage, `profileImages/${name}`);
      uploadBytes(imageRef, profileImageUpload).then(() => {
        alert("Profile image uploaded");
      });
    }
  };

  return (
    <>
      <h2>Profile page</h2>
      <hr></hr>
      <div>
        <input
          type="file"
          onChange={(event) => {
            setProfileImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={uploadProfileImage}>Upload Profile Image</button>
        <br></br>
        <br></br>
        <img id="myImageElement" alt="Profile" style={{ maxWidth: "200px", maxHeight: "200px", width: "auto", height: "auto", borderRadius:"5%" }}/>
      </div>
      <br></br>
    </>
  );
};
