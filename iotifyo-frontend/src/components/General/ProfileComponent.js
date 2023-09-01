import { ProfileImage } from "../ProfileComponents/ProfileImage";
import { EmailComponent } from "../ProfileComponents/EmailComponents";
import Container from "react-bootstrap/Container";
import { FirstnameComponent } from "../ProfileComponents/FirstnameComponent";
import { LastnameComponent } from "../ProfileComponents/LastnameComponent";

export const ProfileComponent = () => {
  return (
    <>
      <Container>
        <h2>Profile page</h2>
        <ProfileImage />
        <EmailComponent />
        <FirstnameComponent />
        <LastnameComponent />
      </Container>
    </>
  );
};
