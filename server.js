const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai"); // For summarization with OpenAI

// Initialize Express app
const app = express();
const upload = multer(); // Middleware for file uploads

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// OpenAI Configuration
const openai = new OpenAIApi(
  new Configuration({ apiKey: "YOUR_OPENAI_API_KEY" }) // Replace with your OpenAI API key
);

// Endpoint to handle file upload and text summarization
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const extractedText = await pdfParse(fileBuffer); // Extract text from PDF

    // Summarize extracted text
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize the following text in a dyslexia-friendly way:\n\n${extractedText.text}`,
      max_tokens: 200,
    });

    const summary = response.data.choices[0].text.trim();
    res.json({ summary });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Failed to process the file." });
  }
});

// Endpoint to handle speech-to-text summarization
app.post("/summarize", async (req, res) => {
  const { input_text } = req.body;

  if (!input_text) {
    return res.status(400).json({ error: "No text provided for summarization." });
  }

  try {
    // Summarize text using OpenAI
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize the following text in a dyslexia-friendly way:\n\n${input_text}`,
      max_tokens: 200,
    });

    const summary = response.data.choices[0].text.trim();
    res.json({ summary });
  } catch (error) {
    console.error("Summarization error:", error);
    res.status(500).json({ error: "Failed to summarize text." });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
