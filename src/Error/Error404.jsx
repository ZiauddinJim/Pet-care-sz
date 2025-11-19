import React from 'react';
import error from "../assets/error.png"
import { Link } from 'react-router';
const Error404 = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen space-y-2'>
            <title>Error 404 | Pet Care</title>
            <img className='w-60 h-60' src={error} alt="Error-404" />
            <h2 className='text-2xl font-bold'>Page Not Found!</h2>
            <Link to={"/"} className='btn btn-primary'>Back to Home</Link>
        </div>
    );
};

export default Error404;