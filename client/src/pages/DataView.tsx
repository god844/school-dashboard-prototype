import React from 'react';
import DataTable from '../components/Data/DataTable';

// Mock data for prototype
const MOCK_DATA = Array.from({ length: 50 }).map((_, i) => ({
    ID: `JOB-${1000 + i}`,
    Name: `Student ${i + 1}`,
    Class: ['10A', '10B', '11A', '12A'][Math.floor(Math.random() * 4)],
    Measurement: `${150 + Math.floor(Math.random() * 30)}cm`,
    Status: ['Pending', 'Started', 'Completed'][Math.floor(Math.random() * 3)],
    Date: new Date().toLocaleDateString(),
}));

const COLUMNS = Object.keys(MOCK_DATA[0]);

const DataView = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Data Management</h1>
                <p className="text-gray-400">View, filter, and export your uploaded data.</p>
            </div>

            <DataTable data={MOCK_DATA} columns={COLUMNS} />
        </div>
    );
};

export default DataView;
