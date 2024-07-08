import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";
import FormBuilderPage from "./pages/FormBuilder";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="app-content">
        <Sidebar isOpen={isOpen} />
        <div className={`content ${isOpen ? "sidebar-open" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={
                <div className="content">
                  <FormBuilderPage />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
