import { useState } from "react";
import { auth } from "@/firebase/config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged
} from "firebase/auth";
import { useNavigate } from "react-router-dom";


const LoginPage: React.FC = () => {
    const [userCredentials, setUserCredentials] = useState({ email: "", password: ""});
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            navigate('/'); // navigate to home
        }
    });

    const handleCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    }

    const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError("");

        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .catch((error) => {
            setError(error.message);
        });
    }

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError("");

        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .catch((error) => {
            setError(error.message);
        });
    }

    const handleForgotPassword = () => {
        const email = prompt("Please enter your email");
        if (!email) return;
        sendPasswordResetEmail(auth, email);
        alert("Email sent! Check your inbox for password reset instructions.");
    }

    return (
        <div className="h-screen flex items-center justify-center bg-[#E8D9CD]">
            <form className="bg-white border-4 border-[#523D35] rounded-2xl shadow-xl p-10 w-full max-w-sm text-center">
                <h2 className="text-2xl font-semibold text-[#523D35] mb-6">
                {isSignup ? 'Create Account' : 'Welcome to AI Interview Coach!'}
                </h2>

                {error && 
                    <div className="mb-4 p-3 bg-red-100 border-2 border-red-400 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                }

                <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={userCredentials.email}
                    onChange={(e) => {handleCredentials(e)}}
                    className="w-full p-3 border-2 border-[#523D35] rounded-lg
                            focus:outline-none focus:border-[#BBA58F] bg-[#FFF7F0]
                            text-[#523D35]"/>

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={userCredentials.password}
                    onChange={(e) => {handleCredentials(e)}}
                    className="w-full p-3 mt-4 border-2 border-[#523D35] rounded-lg
                            focus:outline-none focus:border-[#BBA58F] bg-[#FFF7F0]
                            text-[#523D35]"/>

                {
                    isSignup ?
                    <button
                        className="w-full mt-5 py-3 rounded-lg bg-[#523D35] text-white font-semibold
                            border-2 border-[#523D35]] transition-all"
                        style={{ backgroundColor: "#BBA58F" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#523D35")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#BBA58F")}
                        onClick={(e)=>{handleSignup(e)}}
                    >
                        Sign Up
                    </button>
                    :
                    <button
                        className="w-full mt-5 py-3 rounded-lg bg-[#523D35] text-white font-semibold
                            border-2 border-[#523D35]] transition-all"
                        style={{ backgroundColor: "#BBA58F" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#523D35")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#BBA58F")}
                        onClick={(e)=>{handleLogin(e)}}
                    >
                        Login
                    </button>
                }

                <div className="mt-4 text-[#523D35]">
                    {isSignup ? (
                        <p>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setIsSignup(false)}
                                className="text-[#BBA58F] font-semibold hover:text-[#523D35] transition-colors"
                            >
                                Login
                            </button>
                        </p>
                    ) : (
                        <>
                            <p>
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-[#BBA58F] font-semibold hover:text-[#523D35] transition-colors text-sm"
                                >
                                    Forgot Password?
                                </button>
                            </p>
                            <p className="mt-2">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsSignup(true)}
                                    className="text-[#BBA58F] font-semibold hover:text-[#523D35] transition-colors"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
