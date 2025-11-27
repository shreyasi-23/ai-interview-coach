import { useUser } from "@/components/UserContext" 

const WelcomeScreen = () => {
    const { user } = useUser()

    return (
        <div className="p-4 max-w-xl mx-auto text-center">
            <div className="transition-opacity duration-500">
                <h2 className="text-xl font-semibold">
                    Ready for your interview, {user.username}?
                </h2>
                <p>You are now logged into AI Interview Coach</p>
            </div>
        </div>
    );
};

export default WelcomeScreen;