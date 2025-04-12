import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

// type IUser = {
//     id: String,
//     username: String
// }

const UserContext = createContext({
    user: {id:"", username:""}
})

const UserProvider = (
    {children} : {children: React.ReactNode}
) => {
    const [user, setUser] = useState({id:"", username: ""});
    useEffect(() => {
        const getUser = async () => {
            const res = await axiosInstance.get('/user/get');
            console.log(res.data)
            setUser(res.data)
        }

        getUser();
    }, [])
    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}

export const useGetUser = () => {
    return useContext(UserContext);
}

export { UserContext, UserProvider };