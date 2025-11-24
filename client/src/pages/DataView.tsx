import React, { useEffect, useState } from 'react';
import DataTable from '../components/Data/DataTable';

const DataView = () => {
    const [data, setData] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/jobs');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();

                if (result.data && result.data.length > 0) {
                    // Process the data: Parse the 'data' JSON string and merge with top-level fields
                    const processedData = result.data.map((job: any) => {
                        let parsedData = {};
                        try {
                            parsedData = typeof job.data === 'string' ? JSON.parse(job.data) : job.data;
                        } catch (e) {
                            console.error("Error parsing job data JSON", e);
                        }

                        return {
                            ID: job.batchId || job.id.substring(0, 8), // Use batchId or short ID
                            Status: job.status,
                            Date: new Date(job.createdAt).toLocaleDateString(),
                            ...parsedData
                        };
                    });

                    setData(processedData);

                    // Dynamically determine columns from the first item
                    if (processedData.length > 0) {
                        setColumns(Object.keys(processedData[0]));
                    }
                } else {
                    setData([]);
                    setColumns([]);
                }
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError('Failed to load data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Data Management</h1>
                <p className="text-gray-400">View, filter, and export your uploaded data.</p>
            </div>

            {loading ? (
                <div className="text-center py-12 text-white">Loading data...</div>
            ) : error ? (
                <div className="text-center py-12 text-red-400">{error}</div>
            ) : (
                <DataTable data={data} columns={columns} />
            )}
        </div>
    );
};

export default DataView;
