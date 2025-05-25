const express = require('express');
const router = express.Router();
const status_reservationController = require('../controllers/status_reservationController');

router.get('/', status_reservationController.getAllStatus_reservation);
router.get('/:id', status_reservationController.getStatus_reservationById);
router.post('/', status_reservationController.createStatus_reservation);
router.put('/:id', status_reservationController.updateStatus_reservation);
router.delete('/:id', status_reservationController.deleteStatus_reservation);

module.exports = router;
