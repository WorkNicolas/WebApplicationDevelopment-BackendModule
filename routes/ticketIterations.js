const express = require('express');
const router = express.Router();

const ticketIterationController = require('../controllers/ticketIterationController');
const authController = require("../controllers/authController");
router.get("/", function (req, res, next) {
    res.send("Respond with a ticket iteration resource");
  });
router.post('/create', authController.requireSignin, ticketIterationController.create);
router.get('/list', authController.requireSignin, ticketIterationController.list);
router.get('/get/:ticketIterationID', authController.requireSignin, authController.requireAdmin, ticketIterationController.ticketIterationGet, ticketIterationController.ticketIterationById);
router.put('/edit/:ticketIterationID', authController.requireSignin, authController.requireAdmin, ticketIterationController.update);
router.delete('/delete/:ticketIterationID', authController.requireSignin, authController.requireAdmin, ticketIterationController.remove);

module.exports = router;
