import React from 'react';

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Total Jobs', 'Pending', 'Completed'].map((title) => (
                    <div key={title} className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
                        <p className="text-3xl font-bold text-white">0</p>
                    </div>
                ))}
            </div>
            <div className="glass-panel p-6 rounded-2xl h-96 flex items-center justify-center text-gray-400">
                Chart Placeholder
            </div>
        </div>
    );
};

export default Dashboard;
