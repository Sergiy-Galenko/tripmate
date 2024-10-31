const express = require('express');
const { createTrip, getTrips, updateTrip, deleteTrip } = require('../controllers/tripController');
const router = express.Router();

router.post('/', createTrip);
router.get('/', getTrips);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

module.exports = router;
