const express = require('express');
const router = express.Router();

const ticketIterationController = require('../controllers/ticketIterationController');
const authController = require("../controllers/authController");
router.post('/', authController.requireSignin, authController.requireSignin, ticketIterationController.create);
router.get('/', authController.requireSignin, requireAdmin, ticketIterationController.list);
router.get('/:ticketIterationID', authController.requireSignin, requireAdmin, ticketIterationController.ticketIterationGet, ticketIterationController.ticketIterationById);
router.put('/:ticketIterationID', authController.requireSignin, authController.requireAdmin, ticketIterationController.update);
router.delete('/:ticketIterationID', authController.requireSignin, authController.requireAdmin, ticketIterationController.remove);

module.exports = router;
