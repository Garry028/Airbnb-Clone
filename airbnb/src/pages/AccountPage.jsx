import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../api/config";
import PlacesPage from "./PlacesPage";

export default function AccountPage() {

    const [redirect, setRedirect] = useState(null);
    const { user, ready, setUser, setReady } = useContext(UserContext);
    let { subpage } = useParams()

    if (subpage === undefined) {
        subpage = 'profile';
    }
    // console.log(subpage)


    async function Logout() {
        // const { user, setUser } = useContext(UserContext);
        await axios.post(`${baseURL}/logout`)
        setRedirect('/')
        setUser(null);
    }


    if (!ready) {
        return <div>Loading...</div>
    }


    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    function LinkClasses(type = null) {
        let classes = 'py-2 px-6'
        if (type === subpage || (subpage === undefined && type === 'profile')) {
            classes += ' bg-primary text-white rounded-full'
        }
        return classes
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <nav className="w-full justify-center flex gap-2 mt-8">
                <Link className={LinkClasses('profile')} to={'/account'} >My Profile</Link>
                <Link className={LinkClasses('bookings')} to={'/account/bookings'} >My Bookings</Link>
                <Link className={LinkClasses('places')} to={'/account/places'} >My Accommandations</Link>
            </nav>
            {
                subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto mt-10">
                        Logged in as {user.name} ({user.email})<br />
                        <button onClick={Logout} className="primary max-w-sm mt-2">Logout</button>
                    </div>
                )}
            {
                subpage === 'places' && (
                    <PlacesPage />
                )
            }
        </div>
    );
}

