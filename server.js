const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { sequelize } = require('./models');
const Student = require('./models/student');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dialect: process.env.DB_DIALECT || 'sqlite' });
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const rows = await Student.findAll({ order: [['createdAt', 'DESC']] });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students', details: err.message });
  }
});

// Create student
app.post('/api/students', async (req, res) => {
  try {
    const { fullName, email, phone, course } = req.body;
    if (!fullName || !email || !course) {
      return res.status(400).json({ error: 'fullName, email, and course are required' });
    }
    const student = await Student.create({ fullName, email, phone, course });
    res.status(201).json(student);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Failed to register', details: err.message });
  }
});

// Start
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // auto-create table if not exists
    app.listen(PORT, () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (e) {
    console.error('DB init failed:', e);
    process.exit(1);
  }
})();
