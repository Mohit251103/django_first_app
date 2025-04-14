import React, { createContext, useContext, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

type INote = {
    id: number,
    title: String,
    content: String
}

type INoteContext = {
    notes: INote[],
    setNotes: React.Dispatch<React.SetStateAction<INote[]>>,
    getNotes: () => void,
    deleteNote: (id: number) => void
}

const NoteContext = createContext<INoteContext>({
    notes: [],
    setNotes: () => {},
    getNotes: () => { },
    deleteNote: () => { }
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

    const deleteNote = async (id: number) => {
        try {
            const res = await axiosInstance.delete(`/notes/delete/${id}/`);
            console.log(res);
            getNotes();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NoteContext.Provider value={{notes, setNotes, getNotes, deleteNote}}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNote = () => {
    return useContext(NoteContext);
}

export { NoteContext, NoteProvider };