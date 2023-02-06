import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { baseURL } from '../api/config';
import { UserContext } from '../context/UserContext';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, serRedirect] = useState(false);

    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = await axios.post(`${baseURL}/login`, {
                email,
                password
            },)
            setUser(userInfo.data);
            alert("Login successful")
            serRedirect(true);
        }
        catch (error) {
            alert("Login failed. Please try again")
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className='relative mt-4 grow flex justify-center items-center'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4 '>Login</h1>
                <form action="" className="max-w-md mx-auto">
                    <input type="email" placeholder='johdoe@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='primary'
                        onClick={handleSubmit}
                    >Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet?
                        <Link to={'/register'} className='underline text-black'>Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginPage