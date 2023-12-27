import {useState, useEffect, useContext} from "react";
import menuData from "./MenuData";
import {useNavigate, useLocation} from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import {Link} from 'react-router-dom'
import './Header.css'
import { useTheme } from './ThemeContext';
import { AppContext } from "../../../App";


export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useTheme(); // Importing the theme state
    const sessionStorageWindow = window.sessionStorage;
    const { isAuthenticated, setIsAuthenticated, isAdmin } =
        useContext(AppContext);
    const handleNavigate = (route) => {
        navigate(route);
    };

    const [sticky, setSticky] = useState(false);
    const handleStickyNavbar = () => {
        setSticky(window.scrollY > 0);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleStickyNavbar);
        return () => window.removeEventListener("scroll", handleStickyNavbar);
    }, []);

    const handleLogout = () => {
        sessionStorageWindow.removeItem("token");
        setIsAuthenticated(false);
        localStorage.removeItem("isAdmin")
        handleNavigate("/");
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

    const navbarStyle = {
        ...(
            sticky ? {
                position: 'fixed',  // Keeps the header fixed at the top of the viewport
                top: 0,             // Aligns the header to the top of the viewport
                width: '100%',      // Ensures the header spans the full width
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                // backdropFilter: 'blur(10px)',
                zIndex: 1000,        // Ensures the header stays above other content
                color: 'rgba(255, 255, 255, 0.3)'
            } : {}
        ),
        ...(
            theme === "light" && !sticky ? {
                color: 'white',    // Ensures text color is white for light theme when not sticky
                backgroundColor: '#444' // Sets the specific background color when not sticky
            } : {}
        )
    };

    return (
        <>
            <header
                className={`header z-50 w-full flex items-center transition-all duration-300 ${
                    theme === "light" && !sticky ? "header-light-non-sticky" :
                        theme === "light" ? "header-dark" :
                            "header-light"
                }`}
                style={{ height: '100px', ...navbarStyle, ...(theme === "light" && !sticky ? { color: 'white', backgroundColor: '#444' } : {})}}
            >
                <div className="container">
                    <div className="container flex items-center justify-between">
                        <div className="flex w-full items-center justify-between px-4">
                            <div>
                                <nav className={`navbar duration-300 lg:static lg:w-auto lg:border-none lg:p-0 lg:opacity-100 ${sticky ? 'lg:bg-transparent' : ''}`}>
                                    <ul className="flex space-x-12" style={{display: 'flex', flexDirection: 'row'}}>
                                        <div className="w-60 max-w-full px-4 xl:mr-12">
                                            <Link to="/home">
                                                {(theme === "light" && sticky) || theme === "dark" ? (
                                                    <img
                                                        src="/images/logo/logo-no-background.png"
                                                        alt="logo"
                                                        style={{ maxHeight: '80px', maxWidth: '100px' }}
                                                    />
                                                ) : (
                                                    <img
                                                        src="/images/logo/logo-simple.png"
                                                        alt="logo"
                                                        style={{ maxHeight: '80px', maxWidth: '100px' }}
                                                    />
                                                )}
                                            </Link>
                                        </div>
                                        {
                                            menuData.filter(menuItem => {
                                                if (menuItem.path === '/logout') {
                                                    return isAuthenticated;  // Show logout if authenticated
                                                } else if (['/home', '/profile', '/sensors', '/sensors-data', '/controllers', '/controllers-board', '/contact-us'].includes(menuItem.path)) {
                                                    return isAuthenticated && !isAdmin;  // Show these paths if authenticated and not an admin
                                                } else {
                                                    return true;  // Show all other paths
                                                }
                                            })
                                                .map((menuItem, index) => (
                                                    <li key={index} className="group relative"
                                                        style={{listStyle: 'none', marginRight: '20px'}}>
                                                        <p
                                                            onClick={() => menuItem.path === '/logout' ? handleLogout() : handleNavigate(menuItem.path)}
                                                            className={`bold-text flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 clickable ${
                                                                location.pathname === menuItem.path
                                                                    ? "text-primary dark:text-white"
                                                                    : (theme === "light" && !sticky) ? "text-white" : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                                                            }`}
                                                        >
                                                            {menuItem.title}
                                                        </p>
                                                    </li>
                                                ))
                                        }
                                        <ThemeToggler/>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}