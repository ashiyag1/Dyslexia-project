import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "./ViewNote.css";

const ViewNote = () => {
  const location = useLocation();
  const { note } = location.state || {};

  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [speechMessage, setSpeechMessage] = useState("");

  if (!note) {
    return <p>Note not found!</p>;
  }

  const toggleFont = () => {
    setIsDyslexicFont(!isDyslexicFont);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Arial", isDyslexicFont ? "normal" : "bold");
    doc.text(`Title: ${note.title}`, 10, 10);
    doc.text(note.text, 10, 20);
    doc.save(`${note.title}.pdf`);
  };

  const speakNoteContent = (text) => {
    if (!text) {
      setSpeechMessage("No content to speak!");
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // Language
    speech.rate = 1; // Speed
    speech.pitch = 1; // Pitch
    speech.volume = 1; // Volume

    speech.onstart = () => setSpeechMessage("Speaking...");
    speech.onend = () => setSpeechMessage("Speech finished.");
    speech.onerror = () => setSpeechMessage("An error occurred during speech synthesis.");

    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="view-note">
      <h2 className={isDyslexicFont ? "dyslexic-font" : ""}>{note.title}</h2>
      <div className="note-content">
        <p className={isDyslexicFont ? "dyslexic-font" : ""}>{note.text}</p>
        <button
          className="speak-button"
          onClick={() => speakNoteContent(note.text)}
        >
          Speak
        </button>
      </div>
      {note.images && note.images.length > 0 && (
        <div className="note-images">
          {note.images.map((image, index) => (
            <img key={index} src={image} alt={`Note Visual ${index + 1}`} />
          ))}
        </div>
      )}
      <button onClick={toggleFont}>
        {isDyslexicFont
          ? "Switch to Regular Font"
          : "Switch to Dyslexic-Friendly Font"}
      </button>
      <button onClick={downloadPDF}>Download as PDF</button>

      {/* Speech Feedback */}
      <p className="speech-message">{speechMessage}</p>
    </div>
  );
};

export default ViewNote;
