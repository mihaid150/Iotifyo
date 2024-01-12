import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Footer } from "./components/HeaderAndFooter/Footer/Footer";
import { Authenticate } from "./pages/Authenticate";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home/Home";
import { SensorDataView } from "./pages/SensorDataView";
import { Profile } from "./pages/Profile";
import { Sensors } from "./pages/Sensors";
import { Controllers} from "./pages/Controllers";
import { ControllersBoard } from "./pages/ControllersBoard";
import { ContactUs } from "./pages/ContactUs";
import { Layout } from "./Layout";
import { AdminConsole } from "./pages/Admin/AdminConsole";
import { AccountConfirmation } from "./pages/AccountConfirmation";
import { FetchProfileImageComponent } from "./components/BackgroundFetchers/FetchProfileImageComponent";
import { FetchUserSpecsComponent } from "./components/BackgroundFetchers/FetchUserSpecsComponent";
import { ThemeProvider} from "./components/HeaderAndFooter/Header/ThemeContext";

export const AppContext = createContext();

function App() {
  const encryptionKey =
    "/5kyb/3jJRT7EtPKnwq5iMQ4O3iUFJFyYEmzLBLvwOouAMDd0alUr8bIiRkDKA+hdgRP94VUDYhVrH0DJyXsxLMLhMeb0ZleuVUPLZFMrAs=";
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const ip = "192.168.4.1:8080"; // or localhost:8080 or 192.168.0.101 or mihaiddomain150.go.ro:8080 or 192.168.4.1

  
  const [userSpecs, setUserSpecs] = useState({
    firstname: "",
    lastname: "",
  });
  const [newUserSpecs, setNewUserSpecs] = useState(true);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AppContext.Provider
              value={{
                encryptionKey,
                isAuthenticated,
                setIsAuthenticated,
                ip,
                profileImageUrl,
                setProfileImageUrl,
                userSpecs,
                setUserSpecs,
                newUserSpecs,
                setNewUserSpecs,
                setIsAdmin,
                isAdmin
              }}
            >
              <FetchProfileImageComponent />
              <FetchUserSpecsComponent />
              <Router>
                <Layout>
                    <Routes>
                      <Route path="/" element={<Authenticate />} />
                      <Route path="/account-confirmation" element={<AccountConfirmation />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/sensors-data" element={<SensorDataView />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/sensors" element={<Sensors />} />
                      <Route path="/controllers" element={<Controllers />} />
                      <Route path="/controllers-board" element={<ControllersBoard />} />
                      <Route path="/contact-us" element={<ContactUs />} />
                        {isAdmin && (
                            <Route path="/admin-console" element={<AdminConsole />} />
                        )}
                      <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
                    </Routes>
                <Footer />
                </Layout>
              </Router>
            </AppContext.Provider>
          </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
