import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

type IUser = {
    id: string,
    username: string
}

type IUserContext = {
    user: {
        id: string,
        username: string
    },
    setUser: React.Dispatch<React.SetStateAction<IUser>>,
    getUser: () => void
}

const UserContext = createContext<IUserContext>({
    user: { id: "", username: "" },
    setUser: () => { },
    getUser: () => { }
})

const UserProvider = (
    {children} : {children: React.ReactNode}
) => {
    const [user, setUser] = useState({id:"", username: ""});
    const getUser = async () => {
        try {
            const res = await axiosInstance.get('/user/get');
            localStorage.setItem("username", res.data.username);
            setUser(res.data);
        } catch (error) {
            console.log(error);
            return;
        }
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <UserContext.Provider value={{user, setUser, getUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useGetUser = () => {
    return useContext(UserContext);
}

export { UserContext, UserProvider };