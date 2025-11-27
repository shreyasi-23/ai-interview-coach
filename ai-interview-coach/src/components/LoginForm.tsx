import { useState } from "react";
import { useUser } from "@/components/UserContext";

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
    const [name, setName] = useState("");
    const { setUser } = useUser();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // Correctly call preventDefault
        if (!name.trim()) return; // Prevent login with empty username

        setUser({ username: name }); // Update global user state
        onLogin(); // Notify parent component that the user has logged in
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#E8D9CD] pt-16">
            <form onSubmit={handleLogin} className="bg-white border-4 border-[#523D35] rounded-2xl
                                                    shadow-xl p-10 w-full max-w-sm text-center">
                <h2 className="text-2xl font-semibold text-[#523D35] mb-6">
                Welcome to AI Interview Coach!
                </h2>

                <input
                    type="text"
                    placeholder="Enter your username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border-2 border-[#523D35] rounded-lg
                            focus:outline-none focus:border-[#BBA58F] bg-[#FFF7F0]
                            text-[#523D35]"/>
                <button
                    type="submit"
                    className="w-full mt-5 py-3 rounded-lg bg-[#523D35] text-white font-semibold
                            border-2 border-[#523D35]] transition-all"
                    style={{ backgroundColor: "#BBA58F" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#523D35")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#BBA58F")}
                    >
                        
                    Enter Interview
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
