const express = require("express");
const router = new express.Router();
const app = express();
const { client, connectToDb } = require("./config.js");
const userRouter = require("./routes/userRoutes.js");
const forumRouter = require("./routes/forumRoutes.js");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { v4: uuid } = require("uuid");
const session = require("express-session");
let db;
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: uuid(),
    name: `session_${uuid()}`,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/users", userRouter);
app.use("/forum", forumRouter);

async function main() {
  try {
    // Connect to the MongoDB cluster
    // db = await connectToDb(client);
    // console.dir(db);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
}

main();

module.exports = app;
