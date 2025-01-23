// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>📚 Dyslexia-Friendly Notes</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/notes">My Notes</Link>
        <Link to="/public">Public Notes</Link>
      </nav>
    </header>
  );
};

export default Header;
