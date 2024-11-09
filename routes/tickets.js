const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController');
const authController = require('../controllers/authController');
router.post('/', authController.requireSignin, ticketController.create);
router.get('/', ticketController.list);
router.get('/:ticketID', ticketController.ticketGet, ticketController.ticketByID);
router.put('/:ticketID', authController.requireSignin, ticketController.update);
router.delete('/:ticketID', authController.requireSignin, ticketController.remove);

module.exports = router;
