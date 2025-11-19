import React, { useContext } from 'react';
import MyContainer from '../../MyComponents/MyContainer';
import { MdOutlinePets } from 'react-icons/md';
import PetContext from '../../Providers/PetContext';
import OCSCard from '../OCSCard';
import MyBtn from '../../MyComponents/MyBtn';
import { Link } from 'react-router';
import { FaArrowAltCircleRight, FaArrowRight } from 'react-icons/fa';
import Spinner from '../Spinner';


const OurCareServices = () => {
    const { pets, loading } = useContext(PetContext)
    if (loading) return <Spinner />
    return (
        <div className='bg-pink-50'>
            <MyContainer className={'py-10'}>
                <h1 className='text-2xl md:text-4xl font-bold text-center text-primary 
            md:w-7/12 md:mx-auto mx-3 animate__animated animate__pulse '>Your pet deserves care as unique as they are —
                    explore our full range of
                    veterinary <MdOutlinePets className='inline text-secondary rotate-20' size={40} /> services.
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10 mx-3 md:mx-auto'>
                    {
                        pets.slice(0, 3).map(pet => <OCSCard pet={pet} key={pet.serviceId} />)
                    }
                </div>
                <div className='flex justify-center'>
                    <Link to={"/services"} className='btn btn-primary btn-dash   font-medium px-5'>All Services <FaArrowRight /></Link>
                </div>
            </MyContainer>
        </div>
    );
};

export default OurCareServices;