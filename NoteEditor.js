// src/components/NoteEditor.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NoteEditor.css';

const NoteEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState(location.state?.summary || '');
  const [images, setImages] = useState([]);

  const handleSave = (isPublic) => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const newNote = {
      id: Date.now(),
      title,
      text: summary,
      images,
      isPublic,
    };
    localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
    navigate(isPublic ? '/public-notes' : '/user-notes');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imageUrls]);
  };

  return (
    <div className="note-editor">
      <h2>Edit Your Note</h2>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-title"
      />
      <textarea
        placeholder="Your summarized text will appear here..."
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <div className="add-image">
        <label htmlFor="imageUpload">Add Visuals</label>
        <input type="file" id="imageUpload" multiple onChange={handleImageUpload} />
      </div>
      {images.length > 0 && (
        <div className="image-preview">
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={`img-${idx}`} />
          ))}
        </div>
      )}
      <div className="action-buttons">
        <button className="action-button" onClick={() => handleSave(false)}>
          Save as Private
        </button>
        <button className="action-button secondary" onClick={() => handleSave(true)}>
          Save as Public
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
