const Trip = require('../models/Trip');

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Не вдалося отримати маршрути' });
  }
};

exports.createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Не вдалося створити маршрут' });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Не вдалося оновити маршрут' });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Маршрут видалено' });
  } catch (error) {
    res.status(500).json({ message: 'Не вдалося видалити маршрут' });
  }
};
