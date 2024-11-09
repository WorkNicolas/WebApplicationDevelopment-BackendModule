const express = require('express');
const router = express.Router();

const ticketIterationController = require('../controllers/ticketIterationController');
const { requireSignin } = require('../controllers/authController');
const { requireAdmin } = require('../middlewares/admin');
router.post('/', requireSignin, requireAdmin, ticketIterationController.create);
router.get('/', requireSignin, requireAdmin, ticketIterationController.list);
router.get('/:ticketIterationID', requireSignin, requireAdmin, ticketIterationController.ticketIterationGet, ticketIterationController.ticketIterationById);
router.put('/:ticketIterationID', ticketIterationController.update);
router.delete('/:ticketIterationID', ticketIterationController.remove);

module.exports = router;
