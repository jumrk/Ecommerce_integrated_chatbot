import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../component/footer/Footer';
import Header from '../component/header/Header';
import Chatbot from '../component/chatbot/Chatbot';
function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
}

export default MainLayout;