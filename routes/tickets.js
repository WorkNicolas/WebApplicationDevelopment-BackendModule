const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController');
router.post('/', ticketController.create);
router.get('/', ticketController.list);
router.get('/:ticketID', ticketController.ticketGet, ticketController.ticketByID);
router.put('/:ticketID', ticketController.update);
router.delete('/:ticketID', ticketController.remove);

module.exports = router;
