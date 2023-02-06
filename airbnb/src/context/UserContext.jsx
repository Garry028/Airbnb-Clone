import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseURL } from "../api/config";

export const UserContext = createContext({});


export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    // this is for displaying the user profile
    useEffect(() => {
        if (!user) {
            axios.get(`${baseURL}/profile`).then(({ data }) => {
                setUser(data);
                setReady(true);
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, ready,setReady }}>
            {children}
        </UserContext.Provider>
    );
}