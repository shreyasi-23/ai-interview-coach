import { useUser } from "@/components/UserContext"
import { useEffect, useState } from "react";

const AdminPanel = () => {
    const { user } = useUser()
    const [showWelcome, setShowWelcome] = useState(true);

    // Hide message after 2.5 seconds // temp
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-4 max-w-xl mx-auto">
            {showWelcome ? (
                <div className="transition-opacity duration-500">
                    <h2 className="text-xl font-semibold">
                        Ready for your interview, {user.username}?
                    </h2>
                    <p>You are now logged into AI Interview Coach</p>
                </div>
            ) : (
                <div className="transition-opacity duration-500">
                    <h2 className="text-xl font-semibold">Welcome back, {user.username}</h2>
                    <p className="mt-2">Your dashboard is ready.</p>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;