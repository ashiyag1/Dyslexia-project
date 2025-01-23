import React, { useState } from "react";

function ColorContrastChecker() {
  const [color1, setColor1] = useState("#ffffff");
  const [color2, setColor2] = useState("#000000");
  const [contrastRatio, setContrastRatio] = useState(0);
  const [accessibility, setAccessibility] = useState("");

  // Function to calculate relative luminance
  const calculateLuminance = (color) => {
    const rgb = color
      .replace("#", "")
      .match(/.{2}/g)
      .map((hex) => parseInt(hex, 16) / 255);

    const [r, g, b] = rgb.map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // Function to calculate contrast ratio
  const calculateContrastRatio = () => {
    const luminance1 = calculateLuminance(color1);
    const luminance2 = calculateLuminance(color2);

    const ratio =
      luminance1 > luminance2
        ? (luminance1 + 0.05) / (luminance2 + 0.05)
        : (luminance2 + 0.05) / (luminance1 + 0.05);

    setContrastRatio(ratio.toFixed(2));

    // Determine accessibility level
    if (ratio >= 7) {
      setAccessibility("AAA (Excellent)");
    } else if (ratio >= 4.5) {
      setAccessibility("AA (Good)");
    } else if (ratio >= 3) {
      setAccessibility("AA (Large Text)");
    } else {
      setAccessibility("Fail (Poor Contrast)");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Color Contrast Checker</h2>
      <div>
        <label>
          Color 1:
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
          />
        </label>
        <span style={{ marginLeft: "10px" }}>{color1}</span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>
          Color 2:
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
          />
        </label>
        <span style={{ marginLeft: "10px" }}>{color2}</span>
      </div>
      <button
        onClick={calculateContrastRatio}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Check Contrast
      </button>
      {contrastRatio > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p>Contrast Ratio: {contrastRatio}</p>
          <p>Accessibility Level: {accessibility}</p>
        </div>
      )}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: color1,
          color: color2,
          border: "1px solid #000",
        }}
      >
        Preview Text
      </div>
    </div>
  );
}

export default ColorContrastChecker;
