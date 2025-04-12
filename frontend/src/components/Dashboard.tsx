import { useEffect, useState } from "react";
import AddNote from "./AddNotes"
import { axiosInstance } from "../utils/axiosInstance";
// import { useGetUser } from "../context/UserContext";

type INote = {
    title: String,
    content: String
}
const Dashboard = () => {
    const [notes, setNotes] = useState<INote[]>([]);
    // const { user } = useGetUser();
    useEffect(() => {
        const getNotes = async () => {
            // console.log(user.id)
            const res = await axiosInstance.get(`/notes/get/`);
            setNotes(res.data);
            console.log(res.data)
        }
        getNotes();
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            <AddNote />
            {!notes.length && <p className="text-md">No notes found !!</p>}
            {!!notes.length && 
                <div className="flex flex-wrap gap-4">
                    {notes.map((note, index) => {
                        return (
                            <div key={index} className="w-[10rem] h-[15rem] rounded-lg border-1 hover:opacity-80 flex flex-col justify-center items-left">
                                <p className="text-lg font-bold">{note.title}</p>
                                <p className="text-md font-md">{note.content}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Dashboard;