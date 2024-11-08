var express = require("express");
var router = express.Router();

let ticketController = require("../controllers/ticket");
let authController = require("../controllers/auth");

/* GET ticket listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signin", authController.signin);

router.get("/list", ticketController.list);
router.post("/create", ticketController.create);

router.get("/get/:ticketID", ticketController.ticketGet, ticketController.ticketByID);
router.put("/edit/:ticketID", ticketController.update);

// need to be signed in to delete
router.delete(
  "/delete/:userID",
  authController.requireSignin,
  ticketController.remove
);

module.exports = router;
