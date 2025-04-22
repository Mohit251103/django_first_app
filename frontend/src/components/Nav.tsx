import { FaNoteSticky } from "react-icons/fa6";
import { useGetUser } from "../context/UserContext";
import { axiosInstance } from "../utils/axiosInstance";

const Nav = () => {
    const { user } = useGetUser();
    const handleLogout = async () => {
        try {
            await axiosInstance.get("/user/logout/");
            localStorage.removeItem("username");
            window.location.href = "http://localhost:5173";
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="my-4 w-[70vw] flex justify-between mx-auto items-center">
            <h2 className="text-lg font-bold flex justify-center items-center gap-2">
                <FaNoteSticky className="w-6 h-6" />
                <p>Django-First-Notes</p>
            </h2>
            <div className="flex justify-center items-center gap-2">
                <p className="text-md font-medium">{user.username}</p>
                <button
                    className="w-fit h-fit p-1 text-sm border hover:scale-95 transition duration-200 hover:cursor-pointer rounded-lg"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Nav;