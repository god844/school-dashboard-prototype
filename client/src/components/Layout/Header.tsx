import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-20 px-8 flex items-center justify-between relative z-20">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-jap-blue group-focus-within:text-jap-navy transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search orders, students, or items..."
                        className="w-full bg-glass-surface border border-glass-border rounded-full py-2.5 pl-10 pr-4 text-jap-navy placeholder-jap-blue/70 focus:outline-none focus:border-jap-blue/50 focus:bg-white/40 transition-all shadow-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6 ml-4">
                <button className="relative p-2 text-jap-navy/70 hover:text-jap-navy hover:bg-jap-cloud/50 rounded-full transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-glass-border/50">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-jap-navy">Admin User</p>
                        <p className="text-xs text-jap-blue">Head Tailor</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-gradient-to-br from-jap-blue to-jap-navy flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                        <User size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
