import { useState } from "react"
import { useUser } from "@/components/UserContext"

const LoginForm = () => {
    const [name, setName] = useState("")
    const { setUser } = useUser()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault;
        setUser({ username: name }) // logs in w name
    }

    return (
        <form onSubmit = {handleLogin} className = "p-4 border rounded max-w-sm mx-auto">
            <input
                type = "text"
                placeholder = "Enter Username!"
                value = {name}
                onChange = {(e) => setName(e.target.value)}
                className = "border p-2 w-full"
            />
            <button
                type = "submit"
                className = "mt-2 p-2 w-full bg-brown-500 text-white rounded"
            >
                Login
            </button>
        </form>
    )
}

export default LoginForm