var express = require('express');
var router = express.Router();

const ticketIterationController = require('../controllers/ticketIterationController');
router.post('/', ticketIterationController.create);
router.get('/', ticketIterationController.list);
router.get('/:ticketIterationID', ticketIterationController.ticketIterationGet, ticketIterationController.ticketIterationByID);
router.put('/:ticketIterationID', ticketIterationController.update);
router.delete('/:ticketIterationID', ticketIterationController.remove);

module.exports = router;
