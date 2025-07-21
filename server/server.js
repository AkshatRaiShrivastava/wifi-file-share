// server/server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded');
});

// List files
app.get('/files', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) return res.status(500).send('Error reading files');
    res.json(files);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
