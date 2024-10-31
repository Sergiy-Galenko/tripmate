// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Підключення до MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Підключаємо маршрути
app.use('/api/trips', require('./routes/trips'));

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

