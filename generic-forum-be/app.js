const express = require("express");
const cors = require("cors");
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
const MongoDBStore = require("connect-mongodb-session");
const redis = require("ioredis");
const mongoStore = MongoDBStore(session);
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@sandbox.dqsvm.mongodb.net/sandbox?retryWrites=true&w=majority`;
// const RedisStore = require("connect-redis").default;

// //Configure redis client
// const redisClient = redis.createClient({
//   host: "localhost",
//   port: 3002,
// });

// redisClient.on("error", function (err) {
//   console.log("Could not establish a connection with redis. " + err);
// });
// redisClient.on("connect", function (err) {
//   console.log("Connected to redis successfully");
// });
const store = new mongoStore({
  collection: "userSessions",
  uri,
  expires: 1000000,
});
app.use((req, res, next) => {
  const { url } = req;
  const isCookieSent = req.headers.cookie;
  console.log({ url });
  console.log({ isCookieSent });
  next();
});

app.use(
  session({
    secret: "megaultrasupersecret",
    saveUninitialized: true,
    name: "appName",
    store,
    resave: false,
    cookie: {
      maxAge: 1800 * 24,
      secure: false,
      httpOnly: false,
      domain: "localhost",
      path: "/",
    },
  })
);
app.use(cookieParser("megaultrasupersecret"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5173/f"],
    exposedHeaders: ["set-cookie", "ajax_redirect"],
    preflightContinue: true,
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"],
    optionsSuccessStatus: 200,
  })
);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, withcredentials"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");

//   next();
// });
app.use("/users", userRouter);
app.use("/forum", forumRouter);
// app.set("view engine", "ejs");

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
