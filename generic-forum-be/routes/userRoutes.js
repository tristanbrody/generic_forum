const express = require("express");
const router = new express.Router();
const axios = require("axios");
const { v4: uuid } = require("uuid");
const app = express();
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");
const { Forum, Thread, Post } = require("../models/forumModels");
const { client, connectToDb } = require("../config.js");
const { authMiddleware } = require("../middleware/authMiddleware");
const cookieParser = require("cookie-parser");

let db;
async function run() {
  try {
    db = await connectToDb(client);
  } catch (err) {
    console.log(err);
  }
}

run();

// router.use((req, res, next) => {
//   console.log(req.route);
//   next();
// });

router.post("/logout", async (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

router.post("/login", async (req, res, next) => {
  const { username, emailAddress, password } = req.body;
  const userFound = await User.findOne({
    email: emailAddress,
  });
  if (userFound) {
    const loginResult = bcrypt.compareSync(password, userFound.password);
    if (loginResult) {
      req.session.loggedIn = true;
      req.session.username = userFound.username;
      req.session.isAdmin = userFound.isAdmin;
      req.session.userId = userFound._id;
      console.log(req.session);
      res.json({
        loginResult: true,
        message: "Login successful",
        userId: userFound._id,
      });
    }
  } else {
    res.json({
      loginResult: false,
      message: "Login unsuccessful",
    });
  }
});

router
  .route("/:user_id")
  .get(async (req, res, next) => {
    console.log(req.params.user_id);
    const userId = req.params.user_id;
    const userFound = await User.findOne({
      _id: userId,
    });
    let userPosts = {};
    if (userFound) {
      userPosts = await Post.find({
        postedByUser: req.params.user_id,
      });
    }
    if (!userFound) {
      res.json({ Error: "User not found" });
    } else {
      res.json({ userId, username: userFound.username, userPosts });
    }
  })
  .post((req, res, next) => {});

router
  .route("/")
  .get(async (req, res, next) => {
    let returnArr = [];
    const allUsers = await User.find({});

    for (const u of allUsers) {
      returnArr.push(u);
    }

    res.send(returnArr);
  })
  .post(async (req, res, next) => {
    const { username, emailAddress, newPassword } = req.body;
    const salt = bcrypt.genSaltSync(10);
    let newUserCreated = false;
    let newUser;
    try {
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      newUser = await User.create({
        username,
        email: emailAddress,
        password: hashedPassword,
      });
      newUserCreated = true;
    } catch (err) {
      console.log(err);
      if (err.code == 11000) {
        res.json({ Error: "User already exists" });
      }
    }
    if (newUserCreated) {
      res.json({
        userCreated: true,
        newUsername: newUser.username,
        newUserId: newUser.id,
      });
    }
  });

module.exports = router;
