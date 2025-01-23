import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SummaryOptions.css';

const SummaryOptions = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    setProcessing(true);
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setProcessing(false);

      if (data.summary) {
        navigate("/editor", { state: { summary: data.summary } });
      } else {
        alert("Error: Failed to summarize file.");
      }
    } catch (error) {
      setProcessing(false);
      console.error("File upload error:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  const handleSpeechToText = async () => {
    const speechText = prompt("Please enter the text you want to summarize:");

    if (!speechText) return;

    setProcessing(true);
    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_text: speechText }),
      });

      const data = await response.json();
      setProcessing(false);

      if (data.summary) {
        navigate("/editor", { state: { summary: data.summary } });
      } else {
        alert("Error: Failed to summarize speech.");
      }
    } catch (error) {
      setProcessing(false);
      console.error("Speech-to-text summarization error:", error);
      alert("An error occurred while processing speech.");
    }
  };

  return (
    <div className="summary-options">
      <h2>Generate a Summary</h2>
      <div className="option-buttons">
        <label className="option-button">
          <span className="icon">📄</span> Upload a PDF
          <input
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleFileUpload}
            disabled={processing}
          />
        </label>
        <button className="option-button" onClick={handleSpeechToText} disabled={processing}>
          <span className="icon">🎤</span> Use Speech-to-Text
        </button>
      </div>
      {processing && <p>Processing...</p>}
    </div>
  );
};

export default SummaryOptions;
