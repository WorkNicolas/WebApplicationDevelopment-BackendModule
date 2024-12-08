/**
Mendoza, Carl Nicolas – 301386435
To, Cheuk Man Edmond– 301378748
Dou, Fang – 301381266
HUI, LIT TUNG – 301387861
**/

const express = require("express");
const router = express.Router();

const usersController = require("../controllers/userController");
const authController = require("../controllers/authController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Respond with a user resource");
});

router.post("/signin", authController.signin);

router.get("/list", authController.requireSignin, usersController.list);

// for create user, no requireSignin
router.post("/create", usersController.create);
router.get("/get/:userID", authController.requireSignin, usersController.userGet, usersController.userByID);

// requires signing in
router.put(
  "/edit/:userID",
  authController.requireSignin,
  usersController.update
);
router.delete(
  "/delete/:userID",
  authController.requireSignin,
  usersController.remove
);

module.exports = router;
