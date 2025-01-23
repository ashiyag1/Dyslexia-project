// src/components/UserNotes.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotesGrid.css';

const UserNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const userNotes = notes.filter((note) => !note.isPublic);

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const openNote = (note) => {
    navigate('/editor', { state: { summary: note.text, title: note.title, images: note.images } });
  };

  const viewNote = (note) => {
    navigate('/view-note', { state: { note } });
  };

  return (
    <div className="notes-page">
      <h2>Your Private Notes</h2>
      {userNotes.length > 0 ? (
        <div className="notes-grid">
          {userNotes.map((note) => (
            <div className="note-card" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.text.substring(0, 50)}...</p>
              <button onClick={() => viewNote(note)}>View</button>
              <button onClick={() => openNote(note)}>Edit</button>
              <button
                className="delete-button"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No private notes available. Start creating one!</p>
      )}
    </div>
  );
};

export default UserNotes;
