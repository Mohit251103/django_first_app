import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import { axiosInstance } from "../utils/axiosInstance";

const Error = ({message} : {message: string}) => {
    return (
        <p className="text-red-500 text-sm">{message}</p>
    )
}

const Register = () => {
    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(zod.object({
            username: zod.string().min(10, "Must be 10 character long").max(20, "At max 20 characters long"),
            email: zod.string().email("Must be a valid email"),
            password: zod.string().min(8, "Must be 8 characters long").max(20, "At max 20 characters long")
        }))
    })

    const submitForm = async (data: any) => {
        const res = await axiosInstance.post("/user/create/", data)
        console.log(res);
    }

    return (
        <div className="h-[100vh] w-full flex justify-center items-center">
            <div className="w-fit h-fit p-4 rounded-lg border">
                <form className="flex flex-col items-left justify-center" onSubmit={handleSubmit(submitForm)}>
                    <label htmlFor="username">Username</label>
                    <input className="border rounded-md" type="text" id="username" {...register("username")} />
                    {errors.username && <Error message={errors.username.message!}></Error>}
                    
                    <label htmlFor="email">Email</label>
                    <input className="border rounded-md" type="email" id="email" {...register("email")} />
                    {errors.email && <Error message={errors.email.message!}></Error>}
                    
                    <label htmlFor="password">Password</label>
                    <input className="border rounded-md" type="password" id="password" {...register("password")} />
                    {errors.password && <Error message={errors.password.message!}></Error>}

                    <p className="text-sm">Already have an account? <a href="/" className="text-blue-600 underline">Login</a></p>
                    <button type="submit" className="p-2 rounded-lg text-sm border w-fit h-fit my-1">Register</button>
                </form>
            </div>
        </div>

    )
}

export default Register;