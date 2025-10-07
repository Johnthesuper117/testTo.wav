const express = require('express');
const cors = require('cors');
const text2wav = require('text2wav');
const app = express();
const PORT = 3000;

app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Parses JSON bodies

app.post('/convert-text', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const audio = await text2wav(text); // Converts text to WAV audio data
    res.set('Content-Type', 'audio/wav');
    res.send(Buffer.from(audio)); // Sends the audio data as a WAV file
  } catch (error) {
    console.error('Text-to-WAV conversion failed:', error);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
