import Navbar from "@/components/Navbar";
import { Routes, Route } from "react-router-dom"
import Interview from "@/pages/Interview";

function App() {

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Interview />} />
      </Routes>
    </div>
  );
};

export default App;
