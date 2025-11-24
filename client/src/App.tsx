import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import UploadData from './pages/UploadData';
import WorkStatus from './pages/WorkStatus';
import DataView from './pages/DataView';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="data" element={<DataView />} />
                    <Route path="upload" element={<UploadData />} />
                    <Route path="status" element={<WorkStatus />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
