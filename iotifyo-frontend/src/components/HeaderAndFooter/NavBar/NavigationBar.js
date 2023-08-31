import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { AppContext } from "../../../App";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserSpecifications } from "../../../hooks/useUserSpecifications";

// TODO: create in BackgroundFetchers some components for fetching userSpecifications because these are also used here and in Home page

export const NavigationBar = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [userSpec, setUserSpec] = useState({
    firstname: "",
    lastname: "",
  });
  const { isAuthenticated, setIsAuthenticated, profileImageUrl } = useContext(AppContext);
  const sessionStorageWindow = window.sessionStorage;
  const navigate = useNavigate();
  const location = useLocation();
  const { getUserSpecifications } = useUserSpecifications();

  const handleNavigate = (route) => {
    navigate(route);
  };

  useEffect(() => {
    const token = sessionStorageWindow.getItem("token");
    setIsAuthenticated(!!token);
  }, [setIsAuthenticated, sessionStorageWindow]);

  useEffect(() => {
    // Set isAuthenticated to false when navigating to the home page
    if (location.pathname === "/") {
      setIsAuthenticated(false);
    }
  }, [location, setIsAuthenticated]);

  useEffect(() => {
    if(!isFetched) {
      const fetchUserSpecifications = async () => {
        const userSpecifications = await getUserSpecifications();
        if (userSpecifications) {
          setUserSpec(userSpecifications);
          setIsFetched(true);
        }
      };
      fetchUserSpecifications();
    }
  },[getUserSpecifications, isFetched]);

  const handleLogout = () => {
    sessionStorageWindow.removeItem("token");
    setIsAuthenticated(false);
    handleNavigate("/");
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Navbar.Brand onClick={() => handleNavigate("/home")}>
              IOTIFYO
            </Navbar.Brand>
            {isAuthenticated && (
              <Image
                src="favicon.ico"
                alt="Title Icon"
                className="rounded"
                style={{ width: "40px", height: "40px", marginLeft: "10px" }}
              />
            )}
          </div>
          <Nav className="me-auto">
            {isAuthenticated && (
              <Nav.Link onClick={() => handleNavigate("/home")}>Home</Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link onClick={() => handleNavigate("/dataview")}>
                Data View
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link onClick={() => handleNavigate("/profile")}>
                Profile
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link onClick={() => handleNavigate("/sensor")}>
                Sensor
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link onClick={() => handleNavigate("/contact-us")}>
                Contact Us
              </Nav.Link>
            )}
            {isAuthenticated && (
            <div className="d-flex align-items-center">
              <Image
                src={profileImageUrl}
                alt="User Profile"
                roundedCircle
                style={{  maxWidth:"50px", maxHeight:"35px",width: "auto", height: "auto", marginRight: "10px", marginLeft:"145px" }}
              />
              <span style={{ color: "white" }}>{userSpec?.firstname}</span>
            </div>
          )}
          </Nav>
          
        </Container>
      </Navbar>
      <br />
    </>
  );
};
