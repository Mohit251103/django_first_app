import { FaNoteSticky } from "react-icons/fa6";
import { useGetUser } from "../context/UserContext";
import { axiosInstance } from "../utils/axiosInstance";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const Nav = () => {
    const { user } = useGetUser();
    const [mode, setMode] = useState<string>("dark");
    const handleLogout = async () => {
        try {
            await axiosInstance.get("/user/logout/");
            localStorage.removeItem("username");
            window.location.href = "http://localhost:5173";
        } catch (error) {
            console.log(error)
        }
    }

    const handleModeToggle = () => {
        const newTheme = mode === "dark" ? "light" : "dark";
        setMode(newTheme)
        document.documentElement.classList.add(newTheme);
    }

    return (
        <div className="my-4 w-[70vw] flex justify-between mx-auto items-center">
            <h2 className="text-lg font-bold flex justify-center items-center gap-2">
                <FaNoteSticky className="w-6 h-6" />
                <p>Django-First-Notes</p>
            </h2>
            <div className="flex justify-center items-center gap-2">
                <AnimatePresence>
                    <motion.button
                        animate={{
                            transition: {
                                duration: 0.3
                            }
                        }}
                        onClick={handleModeToggle} className={`w-[65px] h-fit rounded-full border mr-5 flex p-1 
                    ${mode === "light" ? "justify-left" : "justify-end"} items-center`}>
                        <div className={`rounded-full p-1 hover:bg-gray-400/70`}>
                            {mode === "light" &&
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: 40
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            duration: 0.3, 
                                        }
                                    }}
                                >
                                   <MdLightMode className="w-4 h-4" />
                               </motion.div>
                            }
                            {mode === "dark" &&
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: -40
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            duration: 0.3
                                        }
                                    }}
                                >
                                    <MdDarkMode className="w-4 h-4" />
                                </motion.div>
                            }
                        </div>
                    </motion.button>
                </AnimatePresence>
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