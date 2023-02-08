import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../components/Perks';
import axios from 'axios';
import { baseURL } from '../api/config';

function PlacesPage() {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photoLink, setphotoLink] = useState([]);
    const [addedPhotos, setAddedPhotos] = useState([]); // this is for the photos that we add by link
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text) {
        return <h2 className='text-2xl mt-4'>{text}</h2>
    }

    function inputDescription(text) {
        return (
            <p className='text-gray-500'>{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function addPhotoByLink(e) {
        e.preventDefault();

        const { data: filename } = await axios.post(`${baseURL}/upload-by-link`, {
            link: photoLink
        })
        setAddedPhotos(prev => {
            return [...prev, filename];
        })
        setphotoLink('');

    }

    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        data.set('photos', files);
        axios.post(`${baseURL}/upload`, data, {
            headers:{'Content-Type':'multipart/form-data'}
        }).then(response => {
            const { data:filename } = response;
            setAddedPhotos(prev => {
                return [...prev, filename];
            }
            )
        })

    }



    return (
        <div className='mt-10'>
            {/* When we're not on the new then show the add new */}
            {action !== 'new' && (
                <div className='text-center '>
                    <Link to={'/account/places/new'} className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {/* When we're on the new */}
            {action === 'new' && (
                <form action="">
                    {preInput('Title', ' (Title for your place)')}
                    <input type="text" className='w-full border border-gray-300 rounded-md p-2 mt-2' placeholder='Title, for example: My lovely apt'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {preInput('Address', ' (Address to this place)')}
                    <input type="text" placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {preInput('Photos', ' (Photos of your place)')}
                    <div className='flex gap-2'>
                        <input type="text" placeholder={'Add using a link....jpg'}
                            value={photoLink}
                            onChange={(e) => setphotoLink(e.target.value)}

                        />
                        <button className='bg-gray-200 grow rounded-2xl p-4'
                            onClick={addPhotoByLink}
                        >Add&nbsp;Photo </button>
                    </div>
                    <div className='grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>

                        {
                            addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className='rounded-2xl object-cover' src={`http://localhost:4000/uploads/${link}`} alt="No image" />
                                </div>
                            ))
                        }
                        <label className='flex items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer'>
                            <input type="file" className='hidden'
                                onChange={uploadPhoto}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                            </svg>

                            Upload
                        </label>
                    </div>
                    {preInput('Description', ' (Description of the place)')}
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {preInput('Perks', ' (Select all the perks of your place)')}
                    <div className='mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                        <Perks selected={perks} onChange={setPerks} />
                    </div>
                    {preInput('Extra Information', '(House rules , etc)')}
                    <textarea value={extraInfo} onChange={(e) => {
                        setExtraInfo(e.target.value)
                    }} />
                    {preInput('Check In & Out Times', '(Add check in & out times remember to have time for cleaning)')}
                    <div className='grid sm:gri-cols-3 gap-2'>
                        <div>
                            <h3 className='mt-4 '>Check In Time</h3>
                            <input type="text" placeholder='16.00'
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className='mt-2 '>Check Out Time</h3>
                            <input type="text" placeholder='6.00'
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className='mt-2 '>Max number of guests</h3>
                            <input type="number"
                                value={maxGuests}
                                onChange={(e) => setMaxGuests(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button className='primary my-4'>
                            Save
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default PlacesPage