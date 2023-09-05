import { ProfileImage } from "../ProfilePageComponents/ProfileImage";
import { EmailComponent } from "../ProfilePageComponents/EmailComponent";
import Container from "react-bootstrap/Container";
import { FirstnameComponent } from "../ProfilePageComponents/FirstnameComponent";
import { LastnameComponent } from "../ProfilePageComponents/LastnameComponent";
import { PasswordComponent } from "../ProfilePageComponents/PasswordComponent";
import { DeleteComponent} from "../ProfilePageComponents/DeleteComponent";

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
        <DeleteComponent />
      </Container>
    </>
  );
};
