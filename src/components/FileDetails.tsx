import React from 'react';
import { Clock, Link, Lock, FileText, Download } from 'lucide-react';
import { UploadedFile } from '../types';

interface FileDetailsProps {
  file: UploadedFile;
}

export default function FileDetails({ file }: FileDetailsProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <FileText className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="font-medium text-gray-900">{file.name}</h3>
          <p className="text-sm text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {file.encrypted && (
          <div className="flex items-center space-x-2 text-green-600">
            <Lock className="w-4 h-4" />
            <span className="text-sm">End-to-end encrypted</span>
          </div>
        )}

        {file.expiryDate && (
          <div className="flex items-center space-x-2 text-orange-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              Expires {new Date(file.expiryDate).toLocaleDateString()}
            </span>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={() => copyToClipboard(file.url)}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Link className="w-4 h-4 mr-2" />
            Copy Share Link
          </button>
        </div>

        <div>
          <button
            onClick={() => window.open(file.url, '_blank')}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="w-4 h-4 mr-2" />
            Download File
          </button>
        </div>
      </div>
    </div>
  );
}