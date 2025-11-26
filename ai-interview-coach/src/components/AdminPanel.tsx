import { useUser } from "@/components/UserContext"

const AdminPanel = () => {
    const { user } = useUser()

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold">
                Ready for your interview {user.username}?
            </h2>
            <p className="">You are now logged into AI Interview Coach</p>
        </div>
    )
}

export default AdminPanel;