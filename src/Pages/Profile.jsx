import React, { useContext, useState } from 'react';
import { FaRegEdit, FaRegUser } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import MyContainer from '../MyComponents/MyContainer';
import AuthContext from '../Providers/AuthContext';
import userIcon from "../assets/userIcon.png";
import Swal from 'sweetalert2';
import { IoClose } from "react-icons/io5";
import { AiOutlineSave } from "react-icons/ai";

const Profile = () => {
    const { user, updateProfileFun, setLoading, setUser } = useContext(AuthContext);
    const { displayName, photoURL, email } = user;
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        displayName,
        photoURL
    });
    const [originalData, setOriginalData] = useState(formData); //cancel button click and formData Ok

    // Change data
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Update
    const handleEditClick = () => {
        // console.log("CLick");
        setIsEdit(true);
        setOriginalData(formData);
    }

    // Cancel
    const handleCancelClick = () => {
        setOriginalData(originalData)
        setIsEdit(false)
    }

    // Save
    const handleSaveClick = (e) => {
        // console.log("Save");
        e.preventDefault();
        updateProfileFun(formData.displayName, formData.photoURL)
            .then(() => {
                setUser({ ...user, formData })
                // Profile updated!
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated',
                    text: 'Your profile has been updated successfully!',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }).catch(() => {
                // An error occurred
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'Something went wrong. Please try again.',
                });
            });
        setIsEdit(false)
        setLoading(false)
    }
    return (
        <div className="min-h-screen">
            <title>Profile | Pet Care</title>
            <MyContainer>

                {/* Header */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-5 justify-between items-center my-8 mx-3 md:mx-auto text-center md:text-left">
                    <div>
                        <h1 className="font-bold text-2xl md:text-3xl mb-1 text-[#003453]">My Profile</h1>
                        <p className="text-gray-600 text-sm md:text-base">Manage your account information</p>
                    </div>
                    {
                        !isEdit
                            ? <button onClick={handleEditClick} className="btn btn-primary flex items-center gap-2 px-4 py-2 text-sm md:text-base">
                                <CiEdit size={20} />
                                Update Profile
                            </button>
                            : <button onClick={handleCancelClick} className="btn btn-primary flex items-center gap-2 px-4 py-2 text-sm md:text-base">
                                <IoClose /> Cancel
                            </button>
                    }

                </div>

                {/* Main Section */}
                <div className="grid grid-cols-1 md:grid-cols-8 gap-6 md:gap-10 mb-10 mx-3 md:mx-auto place-content-center">
                    {/* Profile Picture */}
                    <div className="relative mx-auto col-span-1 md:col-span-2 bg-white shadow-lg p-6 text-center flex flex-col rounded-2xl w-full max-w-sm">
                        {
                            !isEdit
                                ? <button onClick={handleEditClick} className="absolute top-2 right-2 btn btn-ghost btn-sm p-1">
                                    <FaRegEdit size={20} />
                                </button>
                                : <button onClick={handleCancelClick} className="absolute top-2 right-2 btn btn-ghost btn-sm p-1">
                                    <IoClose size={20} />
                                </button>
                        }
                        <img
                            src={photoURL || userIcon}
                            alt="Profile"
                            className="w-28 h-28 md:w-32 md:h-32 bg-gray-100 rounded-full border-4 p-1 border-[#003453] mx-auto object-cover"
                        />

                        <h3 className="font-bold text-xl mt-4 mb-2 truncate">{displayName}</h3>
                        <p className="text-gray-600 text-sm md:text-base">{email}</p>

                        <div className="mt-3 inline-block bg-green-100 text-green-800 text-sm md:text-base rounded-full py-1 px-4 font-medium">
                            User
                        </div>
                    </div>

                    {/* Profile Details and Update implement */}
                    <div className="col-span-1 md:col-span-6 bg-white shadow-lg p-6 flex flex-col rounded-2xl">
                        <h3 className="flex gap-2 text-xl md:text-2xl font-semibold items-center text-slate-700 mb-6">
                            <FaRegUser /> Personal Information
                        </h3>

                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Name Update implement */}
                            <div>
                                <p className="text-gray-500 text-sm md:text-base">Full Name</p>
                                {
                                    isEdit
                                        ? <input
                                            type="text" name="displayName" placeholder="Your Name" value={formData.displayName}
                                            onChange={handleChange}
                                            className="border placeholder-gray-500 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#fa9984]"
                                        />
                                        : <p className="text-lg md:text-xl font-medium">{displayName}</p>
                                }

                            </div>
                            {/* Email */}
                            <div>
                                <p className="text-gray-500 text-sm md:text-base">Email</p>
                                <p className="text-lg md:text-xl font-medium">{email}</p>
                                <p className='text-sm text-gray-500'>Email cannot be changed</p>
                            </div>
                            {/* Photo URL Update */}
                            {
                                isEdit
                                && <div>
                                    <p className="text-gray-500 text-sm md:text-base">Photo URl</p>
                                    <div className="relative flex items-center">
                                        <input
                                            type="text" name="photoURL" placeholder="Edit your photo URL" value={formData.photoURL}
                                            onChange={handleChange}
                                            className="border placeholder-gray-500 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#fa9984]"
                                        /></div>
                                </div>
                            }
                        </form>
                        {/* Save Button implement */}
                        {
                            isEdit
                            && <button
                                onClick={handleSaveClick}
                                className="btn btn-primary flex items-center gap-2 px-4 py-2 text-sm md:text-base w-fit  mt-5"><AiOutlineSave /> Save
                            </button>
                        }

                    </div>
                </div>
            </MyContainer>
        </div>
    );
};

export default Profile;
