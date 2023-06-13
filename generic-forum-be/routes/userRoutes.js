const express = require("express");
const router = new express.Router();
const apicache = require("apicache-plus");

const {
  getAllUsers,
  getUserData,
  getUsername,
  logout,
  login,
  createNewUser,
} = require("../controllers/users");

const userController = {
  getAllUsers,
  getUserData,
  getUsername,
  logout,
  login,
  createNewUser,
};

router.post("/logout", userController.logout);
router.post("/login", userController.login);
router.get(
  "/u/:user_id",
  apicache.middleware("10 minutes"),
  userController.getUsername
);
router.get("/", userController.getAllUsers);
router.post("/", userController.createNewUser);
router.get("/:user_id", userController.getUserData);

module.exports = router;
