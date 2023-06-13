const express = require("express");
const router = new express.Router();
const axios = require("axios");
const fetch = require("node-fetch");
const { v4: uuid } = require("uuid");
const app = express();
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");
const { Forum, Thread, Post } = require("../models/forumModels");
const { client, connectToDb } = require("../config.js");

let db;
async function run() {
  try {
    db = await connectToDb(client);
  } catch (err) {
    console.log(err);
  }
}

run();

const getAllForums = async (_, res, __) => {
  res.send(await Forum.find({}));
};

const createNewForum = async (req, res, next) => {
  console.log(req.session);
  const { forumName, forumDescription, forumTags, createdBy } = req.body;
  const adminUsers = [createdBy];
  // const createdByUser = req.session.userId;
  //TODO add validation that fields are properly added
  //TODO add error validation for Mongodb calls
  //TODO add validation that users being added as admins are eligible to be admins
  //TODO add validation that user creating forum is eligible to do so
  const newForum = await Forum.create({
    createdBy,
    forumName,
    description: forumDescription,
    adminUsers,
    tags: forumTags,
  });
  res.send({
    newForumData: newForum,
  });
};

const getForumName = async (req, res, next) => {
  const _forumName = req.params.forum_name;
  let forum;
  try {
    forum = await Forum.findOne({ forumName: _forumName });
  } catch (err) {
    console.log(err);
  }
  res.json({ forumId: forum._id });
};

const getThreadData = async (req, res, next) => {
  const forumId = req.params.forum_id;
  const threadId = req.params.thread_id;
  let skipRoute = false;
  // if (forumId === "0") skipRoute = true;
  // if (skipRoute) {
  //   next("route");
  // }
  let resData = {};
  var ObjectId = require("mongoose").Types.ObjectId;
  let forum = false;
  if (ObjectId.isValid(forumId)) {
    forum = await Forum.findById(forumId);
  }
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
};

const addPostToThread = async (req, res, next) => {
  const forumId = req.params.forum_id;
  const threadId = req.params.thread_id;
  const forum = await Forum.findById(forumId);
  console.log(req.session);
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
};

const deletePost = async (req, res, next) => {
  const forumId = req.params.forum_id;
  const threadId = req.params.thread_id;
  const forum = await Forum.findById(forumId);
  if (forum) {
    const { postedByUser, text } = req.body;
    if (postedByUser == req.session.userId) {
      const deletePost = await Post.findOneAndDelete({
        _id: req.params.post_id,
      });
      if (!deletePost) {
        res.json({ Error: "Post not found" });
      }
      res.json({ deletePost });
    } else {
      res.json({
        Error: "Mismatch between logged-in user and user deleting post",
      });
    }
  } else {
    res.json({ Error: "Forum not found" });
  }
};

const updatePost = async (req, res, next) => {
  const forumId = req.params.forum_id;
  const threadId = req.params.thread_id;
  const forum = await Forum.findById(forumId);
  if (forum) {
    const { postedByUser, text } = req.body;
    if (postedByUser == req.session.userId) {
      const updatePost = await Post.findOneAndUpdate(
        { _id: req.params.post_id },
        { text, edited: true }
      );
      if (!updatePost) {
        res.json({ Error: "Post not found" });
      }
      res.json({ updatePost });
    } else {
      res.json({
        Error: "Mismatch between logged-in user and user adding post",
      });
    }
  } else {
    res.json({ Error: "Forum not found" });
  }
};

const getForumData = async (req, res, next) => {
  const forumId = req.params.forum_id;
  const forum = await Forum.findById(forumId);
  if (forum) {
    const threads = await Thread.find({ forumId });
    res.json({ forum, threads });
  } else {
    res.json({ Error: "Forum not found" });
  }
};

const updateForum = async (req, res, next) => {
  const forumId = req.params.forum_id;
  const { threadSubject, createdBy, postText } = req.body;
  const forum = await Forum.findById(forumId);
  if (forum) {
    const newThread = await Thread.create({
      threadSubject,
      createdBy,
      forumId,
    });
    console.log(postText);
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
};

module.exports = {
  getAllForums,
  deletePost,
  addPostToThread,
  getThreadData,
  getForumName,
  updatePost,
  getForumData,
  updateForum,
  createNewForum,
};
