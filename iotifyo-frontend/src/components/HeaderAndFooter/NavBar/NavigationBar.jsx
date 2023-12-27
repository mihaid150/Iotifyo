import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { AppContext } from "../../../App";
import { useNavigate, useLocation } from "react-router-dom";

export const NavigationBar = () => {
  const { isAuthenticated, setIsAuthenticated, profileImageUrl, userSpecs, isAdmin } =
    useContext(AppContext);
  const sessionStorageWindow = window.sessionStorage;
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLogout = () => {
    sessionStorageWindow.removeItem("token");
    setIsAuthenticated(false);
    localStorage.removeItem("isAdmin")
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
            {isAuthenticated && !isAdmin && (
              <Image
                src="favicon.ico"
                alt="Title Icon"
                className="rounded"
                style={{ width: "40px", height: "40px", marginLeft: "10px" }}
              />
            )}
          </div>
          <Nav className="me-auto">
            {isAuthenticated && !isAdmin &&(
              <Nav.Link onClick={() => handleNavigate("/home")}>Home</Nav.Link>
            )}
            {isAuthenticated && !isAdmin &&(
                <Nav.Link onClick={() => handleNavigate("/profile")}>
                  Profile
                </Nav.Link>
            )}
            {isAuthenticated && !isAdmin &&(
                <Nav.Link onClick={() => handleNavigate("/sensors")}>
                  Sensors
                </Nav.Link>
            )}
            {isAuthenticated && !isAdmin &&(
              <Nav.Link onClick={() => handleNavigate("/sensors-data")}>
                Sensors Data
              </Nav.Link>
            )}
            {isAuthenticated && !isAdmin &&(
                <Nav.Link onClick={() => handleNavigate("/controllers")}>
                  Controllers
                </Nav.Link>
            )}
            {isAuthenticated && !isAdmin &&(
                <Nav.Link onClick={() => handleNavigate("/controllers-board")}>
                  Controllers Board
                </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
            {isAuthenticated && !isAdmin &&(
              <Nav.Link onClick={() => handleNavigate("/contact-us")}>
                Contact Us
              </Nav.Link>
            )}
            {isAuthenticated && !isAdmin &&(
              <div className="d-flex align-items-center">
                <Image
                  src={profileImageUrl}
                  alt="User Profile"
                  roundedCircle
                  style={{
                    maxWidth: "50px",
                    maxHeight: "35px",
                    width: "auto",
                    height: "auto",
                    marginRight: "10px",
                    marginLeft: "145px",
                  }}
                />
                <span style={{ color: "white" }}>{userSpecs.firstname}</span>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};
