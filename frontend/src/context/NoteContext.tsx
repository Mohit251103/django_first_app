import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

type INote = {
    title: String,
    content: String
}

type INoteContext = {
    notes: INote[],
    setNotes: React.Dispatch<React.SetStateAction<INote[]>>,
    getNotes: () => void
}

const NoteContext = createContext<INoteContext>({
    notes: [],
    setNotes: () => {},
    getNotes: () => {}
})

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<INote[]>([]);
    const getNotes = async () => {
        try {
            const res = await axiosInstance.get(`/notes/get/`);
            setNotes(res.data);
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getNotes();
    }, [])
    return (
        <NoteContext.Provider value={{notes, setNotes, getNotes}}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNote = () => {
    return useContext(NoteContext);
}

export { NoteContext, NoteProvider };