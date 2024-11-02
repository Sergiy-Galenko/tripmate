const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI); // Додатковий лог для перевірки URI
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error); // Виводимо помилку, якщо підключення не вдалось
    process.exit(1);
  }
};

module.exports = connectDB;
