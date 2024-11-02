const express = require('express');
const router = express.Router();
const { getTrips, createTrip, updateTrip, deleteTrip } = require('../controllers/tripController');

// Отримання всіх маршрутів
router.get('/', getTrips);

// Створення нового маршруту
router.post('/', createTrip);

// Оновлення маршруту
router.put('/:id', updateTrip);

// Видалення маршруту
router.delete('/:id', deleteTrip);

module.exports = router;
