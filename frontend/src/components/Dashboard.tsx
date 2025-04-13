import AddNote from "./AddNotes"
import { useNote } from "../context/NoteContext";

const Dashboard = () => {
    const { notes } = useNote();

    return (
        <div className="flex flex-col justify-center items-center">
            <AddNote />
            {!notes.length && <p className="text-md">No notes found !!</p>}
            {!!notes.length && 
                <div className="flex flex-wrap gap-4 w-[70rem]">
                    {notes.map((note, index) => {
                        return (
                            <div key={index} className="w-[15rem] h-fit rounded-lg border-1 flex flex-col justify-center items-left divide-y">
                                <div className="bg-amber-200 rounded-t-lg">
                                    <p className="text-lg font-bold ml-2">{index + 1}.{" "}{note.title}</p>
                                </div>
                                <div>
                                    <p className="text-md font-md mx-2">{note.content}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Dashboard;