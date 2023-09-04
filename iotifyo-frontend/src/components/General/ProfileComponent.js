import { ProfileImage } from "../ProfileComponents/ProfileImage";
import { EmailComponent } from "../ProfileComponents/EmailComponent";
import Container from "react-bootstrap/Container";
import { FirstnameComponent } from "../ProfileComponents/FirstnameComponent";
import { LastnameComponent } from "../ProfileComponents/LastnameComponent";
import { PasswordComponent } from "../ProfileComponents/PasswordComponent";

export const ProfileComponent = () => {
  return (
    <>
      <Container>
        <h2>Profile page</h2>
        <ProfileImage />
        <EmailComponent />
        <PasswordComponent />
        <FirstnameComponent />
        <LastnameComponent />
      </Container>
    </>
  );
};
