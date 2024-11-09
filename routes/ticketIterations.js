var express = require('express');
var router = express.Router();

const ticketIterationController = require('../controllers/ticketIterationController');
router.post('/', ticketIterationController.create);
router.get('/', ticketIterationController.list);
router.get('/:ticketID', ticketIterationController.ticketIterationGet, ticketIterationController.ticketIterationByID);
router.put('/:ticketID', ticketIterationController.update);
router.delete('/:ticketID', ticketIterationController.remove);

module.exports = router;
