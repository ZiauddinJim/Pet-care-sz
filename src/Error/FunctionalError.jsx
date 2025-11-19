import React from 'react';
import { Link } from 'react-router';
import bugFix from "../assets/bug-fixing.svg"

const FunctionalError = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen space-y-2'>
            <title>Functional Error | Pet Care</title>
            <img className='max-w-80 max-h-80 mx-auto' src={bugFix} alt="Error-404" />
            <h2 className='text-2xl font-bold'>Bug fix is working!</h2>
            <Link to={"/"} className='btn btn-primary'>Back to Home</Link>
        </div>
    );
};

export default FunctionalError;