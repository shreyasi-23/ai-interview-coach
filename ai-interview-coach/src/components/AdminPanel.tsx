import { useUser } from "@/components/UserContext"
import { useEffect, useState } from "react";

const AdminPanel = () => {
    const { user } = useUser()
    const [showWelcome, setShowWelcome] = useState(true);

    // Hide message after 0.5 seconds // temp
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (!showWelcome) return null;

    return (
        <div className="p-6 max-w-xl mx-auto text-center text-[#523D35]">
                <div className="bg-white border-4 border-[#523D35] rounded-2xl p-6 shadow-lg transition-opacity duration-500">
                    <h2 className="text-2xl font-semibold">
                        Ready for your interview, {user.username}?
                    </h2>
                    <p className="text-2xl font-semibold">
                        You are now logged into AI Interview Coach.
                    </p>
                </div>
        </div>
    );
};

export default AdminPanel;