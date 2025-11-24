import React, { useState } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import clsx from 'clsx';

interface DataTableProps {
    data: any[];
    columns: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter Logic
    const filteredData = data.filter((row) => {
        const matchesSearch = Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            return String(row[key]) === value;
        });

        return matchesSearch && matchesFilters;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, 'exported_data.xlsx');
    };

    return (
        <div className="space-y-6 animate-slide-up">
            {/* Controls Bar */}
            <div className="glass-panel p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-jap-blue" size={18} />
                    <input
                        type="text"
                        placeholder="Search data..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/50 border border-glass-border rounded-lg py-2 pl-10 pr-4 text-jap-navy placeholder-jap-blue/70 focus:outline-none focus:border-jap-blue focus:ring-1 focus:ring-jap-blue transition-all"
                    />
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-jap-navy text-white px-4 py-2 rounded-lg hover:bg-jap-navy/90 transition-all shadow-md active:scale-95"
                >
                    <Download size={18} />
                    <span>Export Excel</span>
                </button>
            </div>

            {/* Filters Row */}
            {columns.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {columns.slice(0, 5).map((col) => (
                        <div key={col} className="min-w-[200px]">
                            <select
                                className="w-full bg-glass-surface border border-glass-border rounded-lg py-2 px-3 text-sm text-jap-navy focus:outline-none focus:border-jap-blue cursor-pointer"
                                onChange={(e) => setFilters({ ...filters, [col]: e.target.value })}
                                value={filters[col] || ''}
                            >
                                <option value="">Filter by {col}</option>
                                {[...new Set(data.map((row) => row[col]))].map((val: any) => (
                                    <option key={val} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            )}

            {/* Table */}
            <div className="glass-panel rounded-xl overflow-hidden border border-glass-border shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-jap-cloud/50 border-b border-glass-border">
                                {columns.map((col) => (
                                    <th key={col} className="p-4 font-serif font-bold text-jap-navy text-sm tracking-wide whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {col}
                                            <ArrowUpDown size={14} className="text-jap-blue/50" />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-glass-border">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-jap-ice/30 transition-colors group">
                                        {columns.map((col) => (
                                            <td key={`${idx}-${col}`} className="p-4 text-sm text-jap-navy/80 group-hover:text-jap-navy">
                                                {row[col]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="p-8 text-center text-jap-blue italic">
                                        No data found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-glass-border flex items-center justify-between bg-jap-cloud/20">
                    <span className="text-sm text-jap-navy/70">
                        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to{' '}
                        {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg hover:bg-jap-cloud/50 text-jap-navy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <span className="text-sm font-medium text-jap-navy px-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg hover:bg-jap-cloud/50 text-jap-navy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
