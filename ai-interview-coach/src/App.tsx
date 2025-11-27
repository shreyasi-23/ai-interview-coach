import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AdminPanel from "@/components/AdminPanel";
import LoginForm from "@/components/LoginForm";
import { Routes, Route } from "react-router-dom";
import Interview from "@/pages/Interview";
import Welcome from "@/components/WelcomeScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [showWelcome, setShowWelcome] = useState(false); // State to control welcome screen display

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true); // Update state to indicate the user is logged in
    setShowWelcome(true); // Show welcome screen on login     
  };

  useEffect(() => { 

    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 1500); // Show welcome screen for 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  return (
    <div className="app">
      <Navbar />

      <div className="mt-24">
        {!isLoggedIn && <LoginForm onLogin={handleLogin} />}

        {isLoggedIn && showWelcome && <Welcome />}

        {isLoggedIn && !showWelcome && (
          <>
            <AdminPanel />

            <Routes>
              <Route path="/" element={<Interview />} />
            </Routes>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
