import React, { useState } from 'react';
import { Timer, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';

interface Job {
    id: number;
    status: 'PENDING' | 'STARTED' | 'COMPLETED';
    data: string; // JSON string
    startDate?: string;
    deadline?: string;
}

const StatusTracker = () => {
    // Mock Data
    const [jobs, setJobs] = useState<Job[]>([
        { id: 1, status: 'PENDING', data: '{"Name": "John Doe", "Item": "Blazer"}' },
        { id: 2, status: 'STARTED', startDate: new Date().toISOString(), deadline: new Date(Date.now() + 86400000).toISOString(), data: '{"Name": "Jane Smith", "Item": "Skirt"}' },
        { id: 3, status: 'COMPLETED', data: '{"Name": "Bob Johnson", "Item": "Trousers"}' },
    ]);

    const [activeTab, setActiveTab] = useState<'PENDING' | 'STARTED' | 'COMPLETED'>('STARTED');

    const updateStatus = (id: number, newStatus: 'PENDING' | 'STARTED' | 'COMPLETED') => {
        setJobs(jobs.map(j => j.id === id ? { ...j, status: newStatus } : j));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'text-jap-blue bg-jap-cloud/50 border-jap-blue/30';
            case 'STARTED': return 'text-amber-600 bg-amber-100/50 border-amber-200/50';
            case 'COMPLETED': return 'text-emerald-600 bg-emerald-100/50 border-emerald-200/50';
            default: return 'text-gray-400';
        }
    };

    const filteredJobs = jobs.filter(j => j.status === activeTab);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Tabs */}
            <div className="flex p-1 bg-glass-surface rounded-xl border border-glass-border backdrop-blur-md w-fit mx-auto">
                {(['PENDING', 'STARTED', 'COMPLETED'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setActiveTab(status)}
                        className={clsx(
                            'px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300',
                            activeTab === status
                                ? 'bg-jap-navy text-white shadow-md'
                                : 'text-jap-navy/60 hover:text-jap-navy hover:bg-jap-cloud/30'
                        )}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Kanban Board / List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => {
                    const data = JSON.parse(job.data);
                    return (
                        <div key={job.id} className="glass-card p-6 rounded-xl border border-white/40 hover:border-jap-blue/30 group relative overflow-hidden">
                            {/* Decorative accent */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-jap-blue to-jap-navy opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start mb-4 pl-2">
                                <div>
                                    <h3 className="font-serif font-bold text-lg text-jap-navy">{data.Name || 'Unknown'}</h3>
                                    <p className="text-sm text-jap-blue">{data.Item || 'Uniform Item'}</p>
                                </div>
                                <span className={clsx('px-3 py-1 rounded-full text-xs font-bold border', getStatusColor(job.status))}>
                                    {job.status}
                                </span>
                            </div>

                            {job.status === 'STARTED' && job.deadline && (
                                <div className="mb-4 p-3 bg-amber-50/50 rounded-lg border border-amber-100/50 flex items-center gap-3">
                                    <Timer size={18} className="text-amber-600" />
                                    <div>
                                        <p className="text-xs text-amber-800 font-medium">Deadline</p>
                                        <p className="text-sm text-amber-900 font-bold font-mono">
                                            {format(new Date(job.deadline), 'MMM dd, HH:mm')}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2 mt-4 pl-2">
                                {job.status !== 'COMPLETED' && (
                                    <button
                                        onClick={() => updateStatus(job.id, 'COMPLETED')}
                                        className="flex-1 bg-jap-navy hover:bg-jap-navy/90 text-white py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md active:scale-95"
                                    >
                                        Mark Done
                                    </button>
                                )}
                                {job.status === 'PENDING' && (
                                    <button
                                        onClick={() => updateStatus(job.id, 'STARTED')}
                                        className="flex-1 bg-jap-blue hover:bg-jap-blue/90 text-white py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md active:scale-95"
                                    >
                                        Start Work
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredJobs.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-jap-cloud/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} className="text-jap-blue/50" />
                    </div>
                    <p className="text-jap-navy/50 font-serif italic">No jobs found in this status.</p>
                </div>
            )}
        </div>
    );
};

export default StatusTracker;
