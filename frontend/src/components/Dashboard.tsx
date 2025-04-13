import AddNote from "./AddNotes"
import { useNote } from "../context/NoteContext";

const Dashboard = () => {
    const { notes } = useNote();

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