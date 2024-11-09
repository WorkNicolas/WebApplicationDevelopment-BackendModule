const express = require('express');
const router = express.Router();

const ticketIterationController = require('../controllers/ticketIterationController');
router.post('/', ticketIterationController.create);
router.get('/', ticketIterationController.list);
router.get('/:ticketIterationID', ticketIterationController.ticketIterationGet, ticketIterationController.ticketIterationById);
router.put('/:ticketIterationID', ticketIterationController.update);
router.delete('/:ticketIterationID', ticketIterationController.remove);

module.exports = router;
