const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/analyze', async (req, res) => {
  try {
    const { image } = req.body;
    const buffer = Buffer.from(image, 'base64');
    
    // Save the image
    fs.writeFileSync('temp_image.jpg', buffer);

    // Run the Python script
    const pythonProcess = spawn('python', ['clip_images.py']);

    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: 'Analysis failed' });
      }

      try {
        // Read the result
        const result = fs.readFileSync('result.txt', 'utf8').trim();
        res.json({
          prediction: result.toLowerCase(),
          confidence: 95 // Default confidence since the script doesn't provide one
        });
      } catch (err) {
        res.status(500).json({ error: 'Failed to read analysis results' });
      }
    });

    pythonProcess.on('error', (err) => {
      res.status(500).json({ error: 'Failed to run analysis script' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 