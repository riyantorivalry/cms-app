// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'cms'
});

const contentSchema = new mongoose.Schema({
  title: String,
  body: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Content = mongoose.model('Content', contentSchema, 'contents');

// GET all content
app.get('/api/content', async (req, res) => {
  try {
    const content = await Content.find().sort({ createdAt: -1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new content
app.post('/api/content', upload.single('image'), async (req, res) => {
  const content = new Content({
    title: req.body.title,
    body: req.body.body,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
  });

  try {
    const newContent = await content.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) content
app.put('/api/content/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedContent = await Content.findById(req.params.id);
    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    updatedContent.title = req.body.title;
    updatedContent.body = req.body.body;
    if (req.file) {
      updatedContent.imageUrl = `/uploads/${req.file.filename}`;
    }

    await updatedContent.save();
    res.json(updatedContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE content
app.delete('/api/content/:id', async (req, res) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id);
    if (!deletedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
