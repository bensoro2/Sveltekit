const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/auth");

router.post("/register", UserController.register.bind(UserController));
router.post("/login", UserController.login.bind(UserController));
router.get(
  "/me",
  AuthMiddleware.authenticate,
  UserController.getMe.bind(UserController)
);

module.exports = router;
