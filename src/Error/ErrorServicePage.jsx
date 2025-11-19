import React from 'react';
import error from "../assets/error.png"
import { Link } from 'react-router';

const ErrorServicePage = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen space-y-2'>
            <title>Service page not found | Pet Care</title>
            <img className='w-60 h-60' src={error} alt="Error-404" />
            <h2 className='text-2xl font-bold'>Service page Not Found!</h2>
            <Link to={"/services"} className='btn btn-primary'>Back to Service</Link>
        </div>
    );
};

export default ErrorServicePage;