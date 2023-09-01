import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { OneFormControl } from "../Forms/OneFormControl";
import { useState, useEffect, useContext } from "react";
import { SimpleButton } from "../Buttons/SimpleButton";
import { useUserSpecifications } from "../../hooks/useUserSpecifications";
import { AppContext } from "../../App";

export const LastnameComponent = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [lastname, setLastname] = useState("");
  const [userSpec, setUserSpec] = useState({
    firstname: '',
    lastname: '',
  });
  const { getUserSpecifications, updateUserSpecifications } = useUserSpecifications();
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
  }, [getUserSpecifications, isFetched, lastname]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (lastname && userSpec.firstname) {
      const response = await updateUserSpecifications(
        userSpec.firstname,
        lastname
      );
      if (response.status === 201) {
        alert("Last Name updated to " + lastname);
        setNewUserSpecs(true);
      } else {
        alert("Could not update lastname name to " + lastname);
      }
    }
  };

  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>Last Name</span>
        </Col>
        <Col>
          <OneFormControl
            type="text"
            id="email"
            setState={setLastname}
            placeholder={userSpecs?.lastname}
            hasSetup={true}
          />
        </Col>
        <Col>
          <SimpleButton
            variant="medium"
            label="Change Last Name"
            handleSubmit={handleUpdate}
          />
        </Col>
      </Row>
    </>
  );
};
