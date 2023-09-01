import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useContext, useEffect } from "react";
import { storage } from "../../Firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useAccount } from "../../hooks/useAccount";
import { AppContext } from "../../App";

// TODO: when there exists a profile image and a new one is added, delete the old one

export const ProfileImage = () => {
  const [profileImageUpload, setProfileImageUpload] = useState(null);
  const { saveProfileImageName } = useAccount();
  const { profileImageUrl } = useContext(AppContext);

  useEffect(() => {
    const imgElement = document.getElementById("myImageElement");
    if (imgElement) {
      imgElement.src = profileImageUrl;
    }
  }, [profileImageUrl]);

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
      <hr></hr>
      <Row className="justify-content-center align-items-center">
        <Col>
          <img
            id="myImageElement"
            alt="Profile"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              width: "auto",
              height: "auto",
              borderRadius: "5%",
            }}
          />
        </Col>
        <Col>
          <input
            type="file"
            onChange={(event) => {
              setProfileImageUpload(event.target.files[0]);
            }}
          />
        </Col>
        <Col>
          <button onClick={uploadProfileImage}>Upload Profile Image</button>
          <br></br>
          <span style={{fontSize:"x-small"}}>*If you have already uploaded, now you can just to updated the profile image.</span>
        </Col>
      </Row>
      <br></br>
    </>
  );
};
