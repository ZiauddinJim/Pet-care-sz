import React, { useContext, useEffect } from 'react';
import HeroSlide from '../Components/Home/HeroSlide';
import OurCareServices from '../Components/Home/OurCareServices';
import CareTips from '../Components/Home/CareTips';
import MeetTeem from '../Components/Home/MeetTeem';
import StatsSection from '../Components/StatsSection';
import Aos from 'aos';
import 'aos/dist/aos.css';
import PetContext from '../Providers/PetContext';
import Spinner from '../Components/Spinner';


const Home = () => {
    const { setLoading, loading } = useContext(PetContext)
    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out'
        })
    }, []);

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [setLoading])
    if (loading) return <Spinner />;


    return (
        <div>
            <title>Home | Pet Care</title>
            <div className='bg-slate-50' data-aos="fade-down">
                <HeroSlide />
            </div>
            <div data-aos="fade-up">
                <OurCareServices />
            </div>
            <div data-aos="fade-up">
                <CareTips />
            </div>
            <div data-aos="fade-up">
                <MeetTeem />
            </div>
            <div data-aos="fade-up">
                <StatsSection />
            </div>
        </div>
    );
};

export default Home;