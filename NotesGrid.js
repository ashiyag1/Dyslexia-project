// src/components/NotesGrid.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotesGrid = ({ notes }) => {
  const navigate = useNavigate();

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div
          className="note-card"
          key={note.id}
          onClick={() => navigate('/editor', { state: { summary: note.text, title: note.title, images: note.images } })}
        >
          <h3>{note.title}</h3>
          <p>{note.text.substring(0, 50)}...</p>
        </div>
      ))}
    </div>
  );
};

export default NotesGrid;
