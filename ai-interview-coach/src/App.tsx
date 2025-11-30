import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import InterviewPage from "@/pages/InterviewPage";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {
    setIsLoggedIn(!!user);
    setLoading(false);
  });

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <div className="app">
        {/* Show Navbar only if logged in */}
        {isLoggedIn && <Navbar />}

        <div>
        <Routes>
              {!isLoggedIn ? (
                // LOGIN FORM CATCH-ALL
                <Route path="*" element={<LoginPage />} />
              ) : (
                <>
                  {/* Dashboard / Homepage */}
                  <Route path="/" element={<HomePage />} />

                  {/* Interview Page */}
                  <Route path="/interview" element={<InterviewPage />} />
                </>
              )}
            </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
