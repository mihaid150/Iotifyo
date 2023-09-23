import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationBar } from "./components/HeaderAndFooter/NavBar/NavigationBar";
import { Footer } from "./components/HeaderAndFooter/Footer/Footer";
import { Authenticate } from "./pages/Authenticate";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home/Home";
import { DataView } from "./pages/DataView";
import { Profile } from "./pages/Profile";
import { Sensor } from "./pages/Sensor";
import { ContactUs } from "./pages/ContactUs";
import { AccountConfirmation } from "./pages/AccountConfirmation";
import { FetchProfileImageComponent } from "./components/BackgroundFetchers/FetchProfileImageComponent";
import { FetchUserSpecsComponent } from "./components/BackgroundFetchers/FetchUserSpecsComponent";

export const AppContext = createContext();

function App() {
  const encryptionKey =
    "/5kyb/3jJRT7EtPKnwq5iMQ4O3iUFJFyYEmzLBLvwOouAMDd0alUr8bIiRkDKA+hdgRP94VUDYhVrH0DJyXsxLMLhMeb0ZleuVUPLZFMrAs=";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const ip = "mihaiddomain150.go.ro:8080"; // or localhost:8080 or 192.168.0.101 or mihaiddomain150.go.ro:8080
  
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
          }}
        >
          <FetchProfileImageComponent />
          <FetchUserSpecsComponent />
          <Router>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Authenticate />} />
              <Route
                path="/account-confirmation"
                element={<AccountConfirmation />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dataview" element={<DataView />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sensor" element={<Sensor />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
            </Routes>
            <Footer />
          </Router>
        </AppContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
