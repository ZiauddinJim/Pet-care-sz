import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web'
import { FaStar } from 'react-icons/fa';
import MyBtn from '../MyComponents/MyBtn';

const OCSCard = ({ pet }) => {
    const { image, serviceName, description, rating, serviceId, price } = pet;
    const [hovered, setHovered] = useState(false);

    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateY(30px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { tension: 120, friction: 14 },
    });

    const hoverAnim = useSpring({
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: hovered
            ? '0px 10px 25px rgba(0,0,0,0.15)'
            : '0px 5px 15px rgba(0,0,0,0.1)',
        config: { tension: 200, friction: 15 },
    });

    return (
        <animated.div
            style={{ ...fadeIn, ...hoverAnim }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className='bg-white rounded-2xl p-4 space-y-2 transition-transform'
        >
            <img
                className='rounded-xl w-full h-60 object-cover'
                src={image}
                alt={serviceName}
            />
            <h3 className='font-bold text-xl mt-5'>{serviceName}</h3>
            <p className='text-gray-500'>{description}</p>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center text-secondary'>
                    {Array.from({ length: rating }).map((_, i) => (
                        <FaStar key={i} />
                    ))}
                    <span className='ml-2 text-white bg-primary px-2 rounded'>
                        {rating}
                    </span>
                </div>
                <div className='mr-2 text-secondary bg-orange-50 p-1 rounded-xs'><strong className='text-primary mr-2'>Price: </strong>{price}$ </div>
            </div>
            <MyBtn to={`/service/${serviceId}`} className={'mt-5'}>
                View Details
            </MyBtn>
        </animated.div>
    );
};

export default OCSCard;
