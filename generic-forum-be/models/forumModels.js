const mongoose = require("mongoose");

const forumSchema = mongoose.Schema(
  {
    forumName: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminUsers: {
      type: Array,
      required: false,
    },
    tags: {
      type: Array,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collection: "forums", timestamps: true }
);

const threadSchema = mongoose.Schema(
  {
    threadSubject: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    forumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Forum",
      required: true,
    },
  },
  { collection: "threads", timestamps: true }
);

const postSchema = mongoose.Schema(
  {
    postedByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    threadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { collection: "posts", timestamps: true }
);

//TODO
// forum
// thread
// post
// reply
// juicy/aggressive bots
// post likes
// users with different roles
// user profiles
// followed threads
// ability to ban users
// ability to 'quote' messages
// polls
// ability to pin threads/posts
// admin portal to set topic of forum, invite and manage users
// ability to create custom signatures
// points

const Forum = mongoose.model("Forum", forumSchema);
const Thread = mongoose.model("Thread", threadSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { Forum, Thread, Post };
