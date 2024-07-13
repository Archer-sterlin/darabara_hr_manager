// DocumentUploadPage.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const DocumentUploadPage: React.FC = () => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = () => {
    // Implement your upload logic here
    console.log('Selected files:', selectedFiles);
    // You can add an API call to upload files to your backend
    // For simplicity, we'll log the selected files for now
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Documents</h1>
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-4">
          <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Select Files
          </label>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} multiple />
          <button onClick={handleUpload} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
            Upload
          </button>
        </div>
        {selectedFiles && (
          <div className="border border-gray-300 p-4 rounded-md">
            <h2 className="text-lg font-medium mb-2">Selected Files:</h2>
            <ul>
              {Array.from(selectedFiles).map((file, index) => (
                <li key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Image src="/file-icon.png" alt="File Icon" width={24} height={24} />
                    <span>{file.name}</span>
                  </div>
                  <span>{(file.size / 1024).toFixed(2)} KB</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploadPage;
