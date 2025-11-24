import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import clsx from 'clsx';

interface ColumnManagerProps {
    columns: string[];
    data: any[];
    onConfirm: (selectedColumns: string[]) => void;
    onCancel: () => void;
}

const ColumnManager: React.FC<ColumnManagerProps> = ({ columns, data, onConfirm, onCancel }) => {
    const [selectedColumns, setSelectedColumns] = useState<string[]>(columns);

    const toggleColumn = (column: string) => {
        if (selectedColumns.includes(column)) {
            setSelectedColumns(selectedColumns.filter((c) => c !== column));
        } else {
            setSelectedColumns([...selectedColumns, column]);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white">Manage Columns</h3>
                    <p className="text-gray-400">Select the columns you want to import from your file.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="px-4 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(selectedColumns)}
                        className="glass-button flex items-center gap-2"
                        disabled={selectedColumns.length === 0}
                    >
                        <Check size={18} />
                        Confirm Import
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {columns.map((column) => (
                    <button
                        key={column}
                        onClick={() => toggleColumn(column)}
                        className={clsx(
                            'p-4 rounded-xl border text-left transition-all duration-200',
                            selectedColumns.includes(column)
                                ? 'bg-blue-500/20 border-blue-500/50 text-white'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        )}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium truncate" title={column}>{column}</span>
                            {selectedColumns.includes(column) && <Check size={16} className="text-blue-400" />}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                            Example: {data[0]?.[column]}
                        </div>
                    </button>
                ))}
            </div>

            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                    <h4 className="font-medium text-white">Data Preview (First 5 rows)</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-white/5">
                            <tr>
                                {selectedColumns.map((col) => (
                                    <th key={col} className="px-6 py-3 whitespace-nowrap">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(0, 5).map((row, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                    {selectedColumns.map((col) => (
                                        <td key={col} className="px-6 py-4 whitespace-nowrap">
                                            {row[col]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ColumnManager;
