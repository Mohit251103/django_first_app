import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import zod from "zod"
import Error from "./ErrorFormMessage"
import { axiosInstance } from "../utils/axiosInstance"
import { useNote } from "../context/NoteContext"


const AddNote = () => {
    const { getNotes } = useNote()
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

    const handleFormSubmit = async (data: any) => {
        try {
            const res = await axiosInstance.post(`/notes/create/`, data)
            console.log(res);
            getNotes();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="">
            <form className="flex flex-col justify-center items-left border rounded-lg w-[40rem] p-4 my-4" onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="title">Title</label>
                <input className="border rounded-md" type="text" id="title" {...register("title")} />
                {errors.title && <Error message={errors.title.message!} />}

                <label htmlFor="content" className="mt-2">Content</label>
                <textarea className="border rounded-md" id="content" {...register("content")} />
                {errors.content && <Error message={errors.content.message!} />}

                <button className="p-2 w-fit h-fit my-2 bg-amber-200 rounded-lg border-1" type="submit">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;