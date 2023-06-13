const express = require("express");
const router = new express.Router();
const axios = require("axios");
const fetch = require("node-fetch");
const { v4: uuid } = require("uuid");
const app = express();
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");
const apicache = require("apicache-plus");
const {
  getAllForums,
  deletePost,
  addPostToThread,
  getThreadData,
  getForumName,
  updatePost,
  getForumData,
  updateForum,
  createNewForum,
} = require("../controllers/forum");
const { Forum, Thread, Post } = require("../models/forumModels");
const { client, connectToDb } = require("../config.js");
const { authMiddleware } = require("../middleware/authMiddleware");
const forumController = {
  createNewForum,
  getAllForums,
  deletePost,
  addPostToThread,
  getThreadData,
  getForumName,
  updatePost,
  getForumData,
  updateForum,
};

let db;
async function run() {
  try {
    db = await connectToDb(client);
  } catch (err) {
    console.log(err);
  }
}

run();

//TODO require valid JWT for protected routes
// TODO change some local components to global
// TODO add scoped styles
// TODO add API caching

router.get("/", forumController.getAllForums);
router.post("/", forumController.createNewForum);
router.get(
  "/0/:forum_name",
  forumController.getForumName,
  apicache.middleware("10 minutes")
);
router.get("/:forum_id/:thread_id", forumController.getThreadData);
router.post("/:forum_id/:thread_id", forumController.addPostToThread);
router.delete("/:forum_id/:thread_id/:post_id", forumController.deletePost);
router.post("/:forum_id/:thread_id/:post_id", forumController.updatePost);
router.get("/:forum_id", forumController.getForumData);
router.post("/:forum_id", forumController.updateForum);

module.exports = router;
