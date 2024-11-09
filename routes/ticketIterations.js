var express = require('express');
var router = express.Router();

const ticketIterationController = require('../controllers/ticketIterationController');
router.post('/', ticketIterationController.create);
router.get('/', ticketIterationController.list);
router.get('/:ticketID', ticketIterationController.ticketGet, ticketIterationController.ticketByID);
router.put('/:ticketID', ticketIterationController.update);
router.delete('/:ticketID', ticketIterationController.delete);

module.exports = router;
