import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AppContext } from "../../../App";
import { useNavigate, useLocation } from "react-router-dom";

export const NavigationBar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
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
    handleNavigate("/");
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => handleNavigate("/home")}>
            IOTIFYO
          </Navbar.Brand>
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
              <Nav.Link onClick={() => handleNavigate("/contact-us")}>Contact Us</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};
