import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { OneFormControl } from "../Forms/OneFormControl";
import { useState, useEffect, useContext } from "react";
import { SimpleButton } from "../Buttons/SimpleButton";
import { useUserSpecifications } from "../../hooks/useUserSpecifications";
import { AppContext } from "../../App";

export const FirstnameComponent = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [userSpec, setUserSpec] = useState({
    firstname: "",
    lastname: "",
  });
  const { getUserSpecifications, updateUserSpecifications } =
    useUserSpecifications();
  const { setNewUserSpecs, userSpecs } = useContext(AppContext);

  useEffect(() => {
    if (!isFetched) {
      const fetchUserSpecifications = async () => {
        const userSpecifications = await getUserSpecifications();
        if (userSpecifications) {
          setUserSpec(userSpecifications);
          setIsFetched(true);
        }
      };
      fetchUserSpecifications();
    }
  }, [getUserSpecifications, isFetched, firstname]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (firstname && userSpec.lastname) {
      const response = await updateUserSpecifications(
        firstname,
        userSpec.lastname
      );
      if (response.status === 201) {
        alert("First Name updated to " + firstname);
        setNewUserSpecs(true);
      } else {
        alert("Could not update first name to " + firstname);
      }
    }
  };

  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            First Name
          </span>
        </Col>
        <Col>
          <OneFormControl
            type="text"
            id="firstnameUpdate"
            setState={setFirstname}
            placeholder={userSpecs?.firstname}
            hasSetup={true}
          />
        </Col>
        <Col>
          <SimpleButton
            variant="medium"
            label="Change First Name"
            handleSubmit={handleUpdate}
          />
        </Col>
      </Row>
    </>
  );
};
