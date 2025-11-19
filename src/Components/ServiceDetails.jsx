import React, { useContext, useEffect, useState } from 'react';
import PetContext from '../Providers/PetContext';
import { useParams } from 'react-router';
import Spinner from './Spinner';
import { FaStar } from 'react-icons/fa';
import ErrorServicePage from '../Error/ErrorServicePage';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    const { pets, loading } = useContext(PetContext)
    const { id } = useParams()
    const [formData, setFormData] = useState({ name: '', email: '' })
    const [service, setService] = useState({});

    useEffect(() => {
        const serviceDetails = pets.find(p => p.serviceId === Number(id))
        setService(serviceDetails);
    }, [pets, id]);

    // console.log(serviceDetails);
    if (loading) return <Spinner />;
    if (!service) return <ErrorServicePage />;

    const { serviceId, serviceName, providerEmail,
        price, rating, slotsAvailable, description,
        image, category, providerName } = service

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('click');
        Swal.fire({
            icon: "success",
            title: "Service Booked!",
            text: `Thank you, ${formData.name}. We'll contact you at ${formData.email}.`,
        });

        setFormData({ name: '', email: '' });
    }
    return (
        <div className='max-w-4xl mx-auto p-6 shadow-md rounded-md my-10'>
            <title>Service | Pet Care</title>
            <div className='flex flex-col md:flex-row gap-6'>
                <img src={image} alt={serviceName}
                    className='w-full md:w-1/2 rounded-md object-cover' />
                <div className='flex-1 space-y-1.5'>
                    <h1 className='font-bold text-2xl text-primary '>{serviceName}</h1>
                    <p>{description}</p>
                    <p><strong>Service ID:</strong> {serviceId}</p>
                    <p><strong>Provider Name:</strong> {providerName}</p>
                    <p><strong>Provider Contact:</strong> {providerEmail}</p>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Price:</strong> {price}</p>
                    <div className='flex'><strong>Rating:</strong> <div className='flex flex-row-reverse justify-end gap-2 items-center text-secondary'>
                        {Array.from({ length: rating }).map((_, i) => (
                            <FaStar key={i} />
                        ))} <span className='ml-2 text-white bg-primary px-2 rounded'>{rating}</span></div>
                    </div>
                    <p><strong>Slots Available:</strong> {slotsAvailable}</p>

                    <div className='mt-10 text-2xl font-semibold text-primary'>Book a Consultation:</div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                        <input
                            type="text" name="name" placeholder="Your Name" value={formData.name}
                            onChange={handleChange} required
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#fa9984] placeholder-gray-400"
                        />
                        <input
                            type="email" name="email" placeholder="Your Email" value={formData.email}
                            onChange={handleChange} required
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#fa9984] placeholder-gray-400"
                        />
                        <button type={'submit'} className='btn btn-primary' >Book Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;