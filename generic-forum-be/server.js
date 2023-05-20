require("dotenv").config();
const cors = require("cors");
const app = require("./app");
app.use(cors());
async function run() {
  try {
    app.listen(3001, async () => {
      console.log(`listening on port 3001`);
    });
  } catch (e) {
    console.error(e);
  }
}

run();
