import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import FileUploader from './components/FileUploader';
import FileDetails from './components/FileDetails';
import { UploadedFile } from './types';
import { encryptFile } from './utils/encryption';

function App() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const handleFileSelect = async (file: File, shouldEncrypt: boolean) => {
    if (shouldEncrypt) {
      const { encryptedData, password } = await encryptFile(file);
      // In a real app, we would upload the encrypted data to a server here
      // For demo purposes, we're creating a blob URL
      const blob = new Blob([encryptedData], { type: 'application/encrypted' });
      const url = URL.createObjectURL(blob);

      setUploadedFile({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        encrypted: true,
        url,
        password,
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      });
    } else {
      const url = URL.createObjectURL(file);
      setUploadedFile({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        encrypted: false,
        url
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Secure File Sharing
            </h1>
            <p className="text-lg text-gray-600">
              Share your files securely with end-to-end encryption
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <FileUploader onFileSelect={handleFileSelect} />
          </div>

          {uploadedFile && (
            <div className="flex justify-center">
              <FileDetails file={uploadedFile} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;