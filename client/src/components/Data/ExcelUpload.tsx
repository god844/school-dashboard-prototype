import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileSpreadsheet, X } from 'lucide-react';
import * as XLSX from 'xlsx';
import clsx from 'clsx';

interface ExcelUploadProps {
    onUpload: (data: any[], columns: string[]) => void;
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ onUpload }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target?.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            if (jsonData.length > 0) {
                const columns = Object.keys(jsonData[0] as object);
                onUpload(jsonData, columns);
            }
        };

        reader.readAsBinaryString(file);
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls']
        },
        maxFiles: 1
    });

    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in">
            <div
                {...getRootProps()}
                className={clsx(
                    'border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 group relative overflow-hidden',
                    isDragActive
                        ? 'border-jap-navy bg-jap-cloud/50 scale-[1.02]'
                        : 'border-jap-blue/30 bg-glass-surface hover:border-jap-blue hover:bg-jap-cloud/30'
                )}
            >
                <input {...getInputProps()} />

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className={clsx(
                        "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500",
                        isDragActive ? "bg-jap-navy text-white" : "bg-jap-ice text-jap-blue group-hover:scale-110 group-hover:text-jap-navy"
                    )}>
                        {acceptedFiles.length > 0 ? <FileSpreadsheet size={40} /> : <UploadCloud size={40} />}
                    </div>

                    <div>
                        <h3 className="text-xl font-serif font-bold text-jap-navy mb-2">
                            {acceptedFiles.length > 0 ? acceptedFiles[0].name : "Upload Excel File"}
                        </h3>
                        <p className="text-jap-blue text-sm max-w-xs mx-auto">
                            {acceptedFiles.length > 0
                                ? "File ready to process. Click next to map columns."
                                : "Drag & drop your .xlsx file here, or click to browse."}
                        </p>
                    </div>
                </div>

                {/* Decorative background circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-jap-sky/20 rounded-full blur-3xl -z-0 group-hover:bg-jap-sky/30 transition-all" />
            </div>
        </div>
    );
};

export default ExcelUpload;
