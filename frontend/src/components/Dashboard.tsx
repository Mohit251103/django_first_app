import AddNote from "./AddNotes"
import { useNote } from "../context/NoteContext";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react";
import UpdateNote from "./UpdateNote";

const Dashboard = () => {
    const [updating, setUpdating] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState({ id: null, title: "", content: "" });
    const { notes, getNotes, deleteNote } = useNote();
    const containerVariants = {
        hidden: {
            transition: {
                staggerChildren: 0.07,
                staggerDirection: -1
            }
        },
        show: {
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
        show: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
    };

    const handleDeleteNote = async (id: number) => {
        deleteNote(id);
    }

    const handleUpdateNote = async (id: number, data: any) => {
        setUpdateData({ id, ...data })
        setUpdating(true);
    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            {updating &&
                <UpdateNote
                    data={updateData}
                    onClose={() => { setUpdateData({ id: null, title: "", content: "" }); setUpdating(false); }} />
            }
            <AddNote />
            {!notes.length && <p className="text-md">No notes found !!</p>}
            {!!notes.length &&
                <motion.div
                    key={"unique_key"}
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                    className="flex flex-wrap gap-4 w-[70rem]">

                    <AnimatePresence>
                        {notes.map((note, index) => {
                            return (
                                <motion.div
                                    layout
                                    exit={{
                                        scale: 0.8,
                                        opacity: 0,
                                        transition: { duration: 0.2 }
                                    }}
                                    variants={itemVariants}
                                    key={`note-no-${note.id}`}
                                    className="w-[15rem] h-fit rounded-lg border-1 flex flex-col justify-center items-left gap-y-2">
                                    <div className="bg-amber-200 rounded-t-lg">
                                        <p className="text-lg font-bold ml-2">{index + 1}.{" "}{note.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-md font-md mx-2">{note.content}</p>
                                    </div>
                                    <div className="flex gap-4 mx-2 mb-2 items-center">
                                        <button className="w-fit h-fit hover:cursor-pointer hover:scale-110 transiton duration-250" onClick={() => { handleDeleteNote(note.id) }}>
                                            <MdDeleteOutline className="w-6 h-6" />
                                        </button>
                                        <button className="w-fit h-fit" onClick={() => handleUpdateNote(note.id, { title: note.title, content: note.content })}>
                                            <FaEdit className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            }
        </div>
    )
}

export default Dashboard;