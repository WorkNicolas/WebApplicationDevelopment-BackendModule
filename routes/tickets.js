const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController');
const authController = require('../controllers/authController');
router.get("/", function (req, res, next) {
    res.send("Respond with a ticket resource");
  });
router.post('/create', authController.requireSignin, ticketController.create);
router.get('/list', ticketController.list);
router.get('/get/:ticketID', ticketController.ticketGet, ticketController.ticketByID);
router.put('/edit/:ticketID', authController.requireSignin, ticketController.update);
router.delete('/delete/:ticketID', authController.requireSignin, ticketController.remove);

module.exports = router;
