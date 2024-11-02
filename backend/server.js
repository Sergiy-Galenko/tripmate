const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://sgalenko783:ce6HCOT8CDGviJE6@tripmate.89oez.mongodb.net/?retryWrites=true&w=majority&appName=tripmate';

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Підключення до MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// Маршрут для перевірки роботи сервера
app.get('/', (req, res) => {
  res.send('Сервер працює');
});

// Додаткові маршрути, наприклад, для маршрутів
const tripRoutes = require('./routes/trips');
app.use('/api/trips', tripRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
