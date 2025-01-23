// src/components/UploadForm.js
import React, { useState } from 'react';
import './Form.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      alert(`Uploaded: ${file.name}`);
    } else {
      alert('Please upload a file');
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <label htmlFor="fileInput">Upload a file:</label>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        accept=".pdf, audio/*"
      />
      <button type="submit">Process</button>
    </form>
  );
};

export default UploadForm;
