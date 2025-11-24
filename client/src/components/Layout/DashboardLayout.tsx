import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout: React.FC = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-jap-sky bg-washi-pattern">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-jap-mist/20 to-transparent pointer-events-none" />

                <Header />
                <main className="flex-1 overflow-y-auto p-6 relative z-10 scroll-smooth">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
