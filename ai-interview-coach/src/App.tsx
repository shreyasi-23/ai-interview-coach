import { useState } from "react";
import Navbar from "@/components/Navbar";
import AdminPanel from "@/pages/AdminPanel";
import LoginForm from "@/pages/LoginForm";
import { Routes, Route } from "react-router-dom";
import Interview from "@/pages/Interview";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true); // Update state to indicate the user is logged in
  };

  return (
    <>
    <div className="app">
      {/* Show Navbar only if logged in */}
      {isLoggedIn && <Navbar />}

      <div>
      <Routes>
            {!isLoggedIn ? (
              // LOGIN FORM CATCH-ALL
              <Route path="*" element={<LoginForm onLogin={handleLogin} />} />
            ) : (
              <>
                {/* Dashboard / Homepage */}
                <Route path="/" element={<AdminPanel />} />

                {/* Interview Page */}
                <Route path="/interview" element={<Interview />} />
              </>
            )}
          </Routes>
      </div>
      </div>
    </>
  );
};

export default App;
