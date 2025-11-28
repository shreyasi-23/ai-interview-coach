import { createContext, useState } from "react";
import { useContext } from "react";

type User = {
    username: string | null
}

type UserContextType = {
    user: User
    setUser: (u: User) => void
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>({ username: null})
    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used insider UserProvider");
    return ctx;
}