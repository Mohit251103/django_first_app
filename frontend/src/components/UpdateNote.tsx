import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import zod from "zod"
import Error from "./ErrorFormMessage"
import { useNote } from "../context/NoteContext"
import { useState } from "react"
import { motion } from "motion/react";
import { BiX } from "react-icons/bi"


const UpdateNote = ({ data, onClose }: { data: { id: number | null, title: string, content: string }, onClose: () => void }) => {
    const [updating, setUpdating] = useState<boolean>(false);
    const { updateNote } = useNote()
    const [note, setNote] = useState({ title: data.title, content: data.content });
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(zod.object({
            title: zod.string().max(50, "Cannot be more than 50 characters").nonempty("Required field"),
            content: zod.string().max(500, "Cannot be more than 500 characters long").nonempty("Required field")
        }))
    })

    const handleFormSubmit = async (formdata: any) => {
        setUpdating(true);
        try {
            updateNote(data.id!, formdata);
            onClose()
        } catch (error) {
            console.log(error);
        }
        finally {
            setUpdating(false);
        }
    }

    const handleChange = (e: any) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute top-0 h-[100vh] w-[100vw] flex justify-center items-center bg-black/60 backdrop-blur-sm">
            
            <button className="absolute top-4 right-4 w-4 h-4" onClick={() => onClose()}><BiX color="white"/></button>

            <form className="flex flex-col justify-center items-left border border-white rounded-lg w-[40rem] p-4 my-4" onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="title">Title</label>
                <input
                    className="border rounded-md px-2"
                    type="text"
                    id="title"
                    {...register("title")}
                    value={note.title}
                    onChange={handleChange}
                />
                {errors.title && <Error message={errors.title.message!} />}

                <label htmlFor="content" className="mt-2">Content</label>
                <textarea
                    className="border rounded-md px-2"
                    id="content" {...register("content")}
                    value={note.content}
                    onChange={handleChange}
                />
                {errors.content && <Error message={errors.content.message!} />}

                <button className="p-2 w-fit h-fit my-2 bg-amber-200 rounded-lg border-1" type="submit">{updating ? "Updating...":"Update Note"}</button>
            </form>
        </motion.div>
    )
}

export default UpdateNote;