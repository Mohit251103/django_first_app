import AddNote from "./AddNotes"
import { useNote } from "../context/NoteContext";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { motion } from "motion/react"

const Dashboard = () => {
    const { notes } = useNote();
    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <AddNote />
            {!notes.length && <p className="text-md">No notes found !!</p>}
            {!!notes.length &&
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                    className="flex flex-wrap gap-4 w-[70rem]">
                    {notes.map((note, index) => {
                        return (
                            <motion.div
                                variants={itemVariants}
                                key={index} className="w-[15rem] h-fit rounded-lg border-1 flex flex-col justify-center items-left gap-y-2">
                                <div className="bg-amber-200 rounded-t-lg">
                                    <p className="text-lg font-bold ml-2">{index + 1}.{" "}{note.title}</p>
                                </div>
                                <div>
                                    <p className="text-md font-md mx-2">{note.content}</p>
                                </div>
                                <div className="flex gap-4 mx-2 mb-2 items-center">
                                    <MdDeleteOutline className="w-6 h-6" />
                                    <FaEdit className="w-5 h-5" />
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            }
        </div>
    )
}

export default Dashboard;