import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router';
import MyContainer from '../MyComponents/MyContainer';
import PetContext from '../Providers/PetContext';
import OCSCard from '../Components/OCSCard';
import Spinner from '../Components/Spinner';

const Services = () => {

    const { pets, loading } = useContext(PetContext)
    if (loading) return <Spinner />
    return (
        <div className='bg-red-50 py-10'>
            <title>Services | Pet Care</title>
            <MyContainer>
                <h1 className='font-bold text-4xl text-center'>Service List</h1>
                <ul className="flex justify-center gap-2 mt-4 font-semibold">
                    <li><Link to={"/"} className='text-secondary hover:underline'>Home</Link></li>
                    <li className=''>| Service</li>
                </ul>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10 mx-3 md:mx-auto'>
                    {
                        pets.map(pet => <OCSCard pet={pet} key={pet.serviceId} />)
                    }
                </div>
            </MyContainer>
        </div >
    );
};

export default Services;