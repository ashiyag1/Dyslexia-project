// src/components/PublicNotes.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotesGrid.css';

const PublicNotes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const publicNotes = notes.filter((note) => note.isPublic);

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const viewNote = (note) => {
    navigate('/view-note', { state: { note } });
  };

  const filteredNotes = publicNotes.filter((note) => {
    const title = note.title || '';
    const text = note.text || '';
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="notes-page">
      <h2>Public Notes</h2>
      <input
        type="text"
        placeholder="Search notes by title or content"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {filteredNotes.length > 0 ? (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div className="note-card" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.text.substring(0, 50)}...</p>
              <button onClick={() => viewNote(note)}>View</button>
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
        <p>No notes match your search.</p>
      )}
    </div>
  );
};

export default PublicNotes;
