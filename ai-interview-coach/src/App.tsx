import Navbar from "@/components/Navbar";
import { useUser } from "./components/UserContext";
import AdminPanel from "./components/AdminPanel";
import LoginForm from "./components/LoginForm";

function App() {
  const { user } = useUser();
  const isLoggedIn = user.username !== null;

  return (
    <div className="app">
      <Navbar />

      <div className = "mt-24">
        (isLoggedIn ? <AdminPanel /> : <LoginForm />)
      </div>
    </div>
  )
}

export default App;
