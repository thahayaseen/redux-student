import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addimg, fetchdata } from '../../redux/states/userdata';
import { Camera } from 'lucide-react';
import { ClipLoader } from 'react-spinners';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('accs');

    const { userdata, isloading } = useSelector((state) => state.Userdata);

    useEffect(() => {
        if (!token) {
            navigate('/auth');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!userdata.name) {
            console.log('gone');
            
            dispatch(fetchdata());
        }
    
        

    }, []);


    if (isloading) {
        return <div className='fixed flex flex-col justify-center items-center  w-screen h-screen'>
            <ClipLoader size={50}/>
            <br />
            <h4>Loading ...</h4>
        </div>;
    }

    const upimage = () => {
        const fileInput = document.getElementById('upimg');
        if (fileInput) {
            fileInput.click();
        }
    };
    const handleImageUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files){
            return
        }

        const file = event.target.files[0];
        const form=new FormData()
        form.append('profile',file)
        if (file) {
            console.log('gone');
            
            dispatch(addimg(file))
        }
    }

    return (
        <>
            <Navbar />
            <div className="max-w-md mx-auto p-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                    {/* Profile Image Section */}
                    <div className="relative group">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-2 ring-gray-200">
                            <img
                                src={userdata?.image || 'image.png'}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Camera Icon Overlay */}
                        <label
                            htmlFor="profile-upload"
                            className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer 
                         transform transition-all duration-200 hover:scale-110 hover:bg-gray-50"
                        >
                            <Camera className="w-4 h-4 text-gray-600" />
                        </label>

                        <input
                            type="file"
                            id="profile-upload"
                            className="hidden"
                            name='profile'
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {/* User Details Section */}
                    <div className="flex flex-col items-center sm:items-start gap-1">
                        <h2 className="text-xl font-medium text-gray-900">
                            {userdata?.name || 'Your Name'}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {userdata?.email || 'your.email@example.com'}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
