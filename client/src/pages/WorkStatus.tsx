import React, { useState } from 'react';
import StatusTracker from '../components/Work/StatusTracker';

// Mock jobs for prototype
const INITIAL_JOBS = Array.from({ length: 12 }).map((_, i) => ({
    id: `job-${i}`,
    status: ['PENDING', 'STARTED', 'COMPLETED'][Math.floor(Math.random() * 3)] as any,
    startDate: new Date(),
    deadline: new Date(Date.now() + 86400000 * 2), // 2 days from now
    data: {
        Name: `Student ${i + 1}`,
        Class: '10A',
        Uniform: 'Full Set',
        Notes: 'Urgent'
    }
}));

const WorkStatus = () => {
    const [jobs, setJobs] = useState(INITIAL_JOBS);

    const handleStatusChange = (jobId: string, newStatus: any) => {
        setJobs(jobs.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Work Status</h1>
                <p className="text-gray-400">Track progress and manage deadlines.</p>
            </div>

            <StatusTracker jobs={jobs} onStatusChange={handleStatusChange} />
        </div>
    );
};

export default WorkStatus;
