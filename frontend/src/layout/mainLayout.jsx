import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';
import Header from '../component/Header';

function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;