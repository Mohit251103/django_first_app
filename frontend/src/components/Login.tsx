import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import { axiosInstance } from "../utils/axiosInstance";
import Error from "./ErrorFormMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(zod.object({
            username: zod.string().min(10, "Must be 10 character long").max(20, "At max 20 characters long"),
            password: zod.string().min(8, "Must be 8 characters long").max(20, "At max 20 characters long")
        }))
    })

    const submitForm = async (data: any) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post("/user/login/", data)
            console.log(res);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleGoogleLogin = (e: any) => {
        window.location.href = "http://localhost:8000/auth/login/google-oauth2/";
        e.stopPropagation();
    }

    return (
        <div className="h-[100vh] w-full flex justify-center items-center">
            <div className="w-fit h-fit p-4 rounded-lg border">
                <form className="flex flex-col items-left justify-center" onSubmit={handleSubmit(submitForm)}>
                    <label htmlFor="username">Username</label>
                    <input className="border rounded-md" type="text" id="username" {...register("username")} />
                    {errors.username && <Error message={errors.username.message!}></Error>}

                    <label htmlFor="password">Password</label>
                    <input className="border rounded-md" type="password" id="password" {...register("password")} />
                    {errors.password && <Error message={errors.password.message!}></Error>}

                    <p className="text-sm">Don't have an account? <a href="/register" className="text-blue-600 underline">Register</a></p>
                    <div className="flex justify-left items-center">
                        <button
                            type="submit"
                            className="p-2 rounded-lg text-sm border w-fit h-fit m-1"
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                        <button
                            type="button"
                            className="p-2 rounded-lg text-sm border w-fit h-fit m-1 flex justify-center items-center gap-2"
                            onClick={handleGoogleLogin}
                        >
                            Login with Google<BsGoogle className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;