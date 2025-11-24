import React, { useState } from 'react';
import ExcelUpload from '../components/Data/ExcelUpload';
import ColumnManager from '../components/Data/ColumnManager';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadData = () => {
    const [step, setStep] = useState<'upload' | 'mapping' | 'success'>('upload');
    const [data, setData] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleDataLoaded = (loadedData: any[], loadedColumns: string[]) => {
        setData(loadedData);
        setColumns(loadedColumns);
        setStep('mapping');
    };

    const handleConfirmColumns = async (selectedColumns: string[]) => {
        // Filter data to only include selected columns
        const filteredData = data.map(row => {
            const newRow: any = {};
            selectedColumns.forEach(col => {
                newRow[col] = row[col];
            });
            return newRow;
        });

        console.log('Uploading data:', filteredData);

        // TODO: Send to backend
        // await api.post('/jobs', { jobs: filteredData });

        setStep('success');
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Upload Data</h1>
                <p className="text-gray-400">Import your Excel files to create new jobs.</p>
            </div>

            {step === 'upload' && (
                <div className="glass-panel p-8 rounded-2xl animate-fade-in">
                    <ExcelUpload onDataLoaded={handleDataLoaded} />
                </div>
            )}

            {step === 'mapping' && (
                <ColumnManager
                    columns={columns}
                    data={data}
                    onConfirm={handleConfirmColumns}
                    onCancel={() => setStep('upload')}
                />
            )}

            {step === 'success' && (
                <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center animate-fade-in text-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                        <CheckCircle size={40} className="text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Upload Successful!</h2>
                    <p className="text-gray-400">Your data has been imported. Redirecting to dashboard...</p>
                </div>
            )}
        </div>
    );
};

export default UploadData;
