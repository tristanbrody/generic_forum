const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@sandbox.dqsvm.mongodb.net/sandbox?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    ssl: true,
  },
});

async function connectToDb(client) {
  //connecting via both Mongoose and MongoDB driver
  await mongoose.connect(uri);
  switch (mongoose.connection.readyState) {
    case 0:
      console.log("Mongoose is disconnected");
      break;
    case 1:
      console.log("Mongoose is connected");
      break;
    case 2:
      console.log("Mongoose is connecting");
      break;
    case 3:
      console.log("Mongoose is disconnecting");
      break;
  }
  await client.connect();
  return client.db("sandbox");
}

// client.connect(async function (err, db) {
//   console.dir(db);
//   console.dir(err);
// });
module.exports = {
  client,
  connectToDb,
};
