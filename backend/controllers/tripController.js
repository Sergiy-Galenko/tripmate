const Trip = require('../models/Trip');

// Створення нового маршруту
exports.createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Отримання всіх маршрутів
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Оновлення маршруту
exports.updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Видалення маршруту
exports.deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Маршрут видалено' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
