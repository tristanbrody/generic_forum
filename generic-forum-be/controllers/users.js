const express = require("express");
const router = new express.Router();
const axios = require("axios");
const { v4: uuid } = require("uuid");
const app = express();
const bcrypt = require("bcryptjs");
const { User } = require("../models/userModels");
const bodyParser = require("body-parser");
const { Forum, Thread, Post } = require("../models/forumModels");
const { client, connectToDb } = require("../config.js");
const { authMiddleware } = require("../middleware/authMiddleware");
const apicache = require("apicache-plus");

let db;
async function run() {
  try {
    db = await connectToDb(client);
  } catch (err) {
    console.log(err);
  }
}

run();

const getAllUsers = async (req, res, next) => {
  let returnArr = [];
  const allUsers = await User.find({});

  for (const u of allUsers) {
    returnArr.push(u);
  }

  res.send(returnArr);
};

const createNewUser = async (req, res, next) => {
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
};

const login = async (req, res, next) => {
  const { emailAddress, password } = req.body;
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
      console.log(req.session.id);
      req.session.save();
      res.json({
        loginResult: true,
        message: "Login successful",
        userId: userFound._id,
        username: userFound.username,
      });
    }
  } else {
    res.json({
      loginResult: false,
      message: "Login unsuccessful",
    });
  }
};

const logout = async (req, res, next) => {
  console.log(req.session.id);
  req.session.destroy();
  res.json({ loggedOut: true });
};

const getUsername = async (req, res, next) => {
  const userId = req.params.user_id;

  const userFound = await User.findOne({ _id: userId });
  res.json({ username: userFound.username });
};

const getUserData = async (req, res, next) => {
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
};

module.exports = {
  getAllUsers,
  getUserData,
  getUsername,
  logout,
  login,
  createNewUser,
};
