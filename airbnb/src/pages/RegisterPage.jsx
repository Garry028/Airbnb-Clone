import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../api/config';
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${baseURL}/register`, {
                name,
                email,
                password
            });
            navigate('/login');
            alert("Registration succesful. Now you can log in")
        }
        catch (error) {
            alert("Registration failed. Please try again")
        }
    }

    return (
        <div className='relative mt-4 grow flex justify-center items-center'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4 '> Register</h1>
                <form action="" className="max-w-md mx-auto">
                    <input type="text" placeholder='John Doe'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    >Sign Up</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a member?
                        <Link to={'/login'} className='underline text-black'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage