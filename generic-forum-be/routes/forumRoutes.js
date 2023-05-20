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

router
  .route("/")
  .get(async (req, res, next) => {
    res.send(await Forum.find({}));
  })
  .post(async (req, res, next) => {
    console.dir(req);
    const {
      createdByUser,
      forumName,
      forumDescription,
      forumTags,
      adminUsers,
    } = req.body;
    //TODO add validation that fields are properly added
    //TODO add error validation for Mongodb calls
    //TODO add validation that users being added as admins are eligible to be admins
    //TODO add validation that user creating forum is eligible to do so
    const newForum = await Forum.create({
      createdBy: createdByUser,
      forumName,
      description: forumDescription,
      adminUsers,
      tags: forumTags,
    });
    res.send({
      newForumData: newForum,
    });
  })
  .delete(async (res, req, next) => {});

router
  .route("/:forum_id/:thread_id/:post_id")
  .get(async (res, req, next) => {});

router.route("/a").get(async (req, res, next) => {
  res.json({ Result: "Matched 'a' route" });
});

router
  .route("/:forum_id/:thread_id")
  .get(async (req, res, next) => {
    const forumId = req.params.forum_id;
    const threadId = req.params.thread_id;
    let resData = {};
    const forum = await Forum.findById(forumId);
    if (forum) {
      const thread = await Thread.findById(threadId);
      if (thread) {
        resData.threadSubject = thread.threadSubject;
        const posts = await Post.find({
          threadId,
        });
        if (posts) {
          resData.posts = posts;
          posts.sort((a, b) => {
            return a.createdAt < b.createdAt;
          });
        }
        res.json(resData);
      } else {
        res.json({ Error: "Thread not found" });
      }
    } else {
      res.json({ Error: "Forum not found" });
    }
  })
  .post(async (req, res, next) => {
    const forumId = req.params.forum_id;
    const threadId = req.params.thread_id;
    const forum = await Forum.findById(forumId);
    if (forum) {
      const { postedByUser, text } = req.body;
      if (postedByUser == req.session.userId) {
        const newPost = await Post.create({ postedByUser, text, threadId });
        res.json({ newPost });
      } else {
        res.json({
          Error: "Mismatch between logged-in user and user adding post",
        });
      }
    } else {
      res.json({ Error: "Forum not found" });
    }
  });

router
  .route("/:forum_id")
  .get(async (req, res, next) => {
    //should return all the threads for the given forum
    const forumId = req.params.forum_id;
    const forum = await Forum.findById(forumId);
    if (forum) {
      const threads = await Thread.find({ forumId });
      res.json({ forum, threads });
    } else {
      res.json({ Error: "Forum not found" });
    }
  })
  .post(authMiddleware, async (req, res, next) => {
    const forumId = req.params.forum_id;
    const { threadSubject, createdBy, postText } = req.body;
    const forum = await Forum.findById(forumId);
    if (forum) {
      const newThread = await Thread.create({
        threadSubject,
        createdBy,
        forumId,
      });
      const newPost = await Post.create({
        postedByUser: createdBy,
        text: postText,
        threadId: newThread.id,
      });
      res.json({
        result: {
          newThread,
          newPost,
        },
      });
    } else {
      res.json({ Error: "Forum not found" });
    }
  })
  .delete(async (req, res, next) => {
    //should allow you to delete a forum
  });

module.exports = router;
