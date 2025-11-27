import { useState } from "react";
import { useUser } from "@/components/UserContext";

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
    const [name, setName] = useState("");
    const { setUser } = useUser();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // Correctly call preventDefault
        setUser({ username: name }); // Update global user state
        onLogin(); // Notify parent component that the user has logged in
    };

    return (
        <form onSubmit={handleLogin} className="p-4 border rounded max-w-sm mx-auto">
            <input
                type="text"
                placeholder="Enter Username!"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
            />
            <button
                type="submit"
                className="mt-2 p-2 w-full bg-yellow-500 text-white rounded"
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;
