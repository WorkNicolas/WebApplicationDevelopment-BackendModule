var express = require('express');
var router = express.Router();

const ticketController = require('../controllers/ticketController');
router.post('/', ticketController.create);
router.get('/', ticketController.list);
router.get('/:contactID', ticketController.ticketGet, ticketController.ticketByID);
router.put('/:contactID', ticketController.update);
router.delete('/:contactID', ticketController.delete);

module.exports = router;
