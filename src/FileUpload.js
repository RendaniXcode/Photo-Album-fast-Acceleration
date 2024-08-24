import React, { useState } from 'react';
import './App.css';
import s3 from './aws-config';  // Importing the S3 instance with Transfer Acceleration enabled

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); 
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setSuccessMessage('');
        setProgress(0);
    };

    const handleUpload = () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        const params = {
            Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
            Key: file.name,
            Body: file,
            ContentType: file.type,
        };

        const upload = s3.upload(params);

        upload.on('httpUploadProgress', (evt) => {
            const percent = Math.round((evt.loaded / evt.total) * 100);
            setProgress(percent);
        });

        upload.send((err, data) => {
            if (err) {
                console.error('Error uploading file:', err);
                alert('Error uploading file');
            } else {
                console.log('File uploaded successfully:', data.Location);
                setSuccessMessage('File uploaded successfully!');
                setFile(null);
                setProgress(0);

                setTimeout(() => setSuccessMessage(''), 5000);
            }
        });
    };

    return (
        <div className="upload-container">
            <h2>Upload to S3</h2>
            <input 
                type="file" 
                onChange={handleFileChange} 
                value={file ? undefined : ""} 
            />
            <button onClick={handleUpload}>Upload File</button>

            {progress > 0 && (
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
            )}

            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default FileUpload;
