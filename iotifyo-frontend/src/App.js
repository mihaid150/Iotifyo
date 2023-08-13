import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";
import { Authenticate } from "./pages/Authenticate";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { DataView } from "./pages/DataView";
import { Profile } from "./pages/Profile";
import { Sensor } from "./pages/Sensor";

export const AppContext = createContext();

function App() {
  const encryptionKey =
    "/5kyb/3jJRT7EtPKnwq5iMQ4O3iUFJFyYEmzLBLvwOouAMDd0alUr8bIiRkDKA+hdgRP94VUDYhVrH0DJyXsxLMLhMeb0ZleuVUPLZFMrAs=";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const ip = "mihaiddomain150.go.ro:8080"; // or localhost:8080 or 192.168.0.101 or mihaiddomain150.go.ro:8080

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
          value={{ encryptionKey, isAuthenticated, setIsAuthenticated, ip }}
        >
          <Router>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Authenticate />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dataview" element={<DataView />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sensor" element={<Sensor />} />
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
