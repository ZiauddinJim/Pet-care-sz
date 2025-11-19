import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { Toaster } from 'react-hot-toast';

const HomeLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header>
                <Navbar />
            </header>
            <main className='flex-1'>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
            < Toaster />
        </div>
    );
};

export default HomeLayout;