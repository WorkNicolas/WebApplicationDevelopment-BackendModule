var express = require('express');
var router = express.Router();

const ticketIterationController = require('../controllers/ticketIterationController');
router.post('/', ticketIterationController.create);
router.get('/', ticketIterationController.list);
router.get('/:contactID', ticketIterationController.ticketGet, ticketIterationController.ticketByID);
router.put('/:contactID', ticketIterationController.update);
router.delete('/:contactID', ticketIterationController.delete);

module.exports = router;
