import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, Table2, CheckSquare } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Upload, label: 'Upload Data', path: '/upload' },
        { icon: Table2, label: 'Data View', path: '/data' },
        { icon: CheckSquare, label: 'Work Status', path: '/status' },
    ];

    return (
        <aside className="w-64 h-screen bg-glass-surface backdrop-blur-xl border-r border-glass-border flex flex-col relative z-20 shadow-2xl">
            <div className="p-6 border-b border-glass-border/50">
                <h1 className="text-2xl font-serif font-bold text-jap-navy tracking-wider">
                    Zen<span className="text-jap-blue">Tailor</span>
                </h1>
                <p className="text-xs text-jap-blue mt-1 font-sans tracking-widest uppercase opacity-80">School Uniforms</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group',
                                isActive
                                    ? 'bg-jap-navy text-white shadow-md translate-x-1'
                                    : 'text-jap-navy/70 hover:bg-jap-cloud/50 hover:text-jap-navy hover:translate-x-1'
                            )
                        }
                    >
                        <item.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-medium tracking-wide">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-glass-border/50">
                <div className="p-4 rounded-lg bg-jap-cloud/30 border border-white/20">
                    <p className="text-xs text-jap-navy/60 text-center font-serif italic">"Quality in every stitch"</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
