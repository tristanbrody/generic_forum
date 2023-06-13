const {
  getAllUsers,
  getUserData,
  getUsername,
  logout,
  login,
  createNewUser,
} = require("../controllers/users");

require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;

const userController = {
  getAllUsers,
  getUserData,
  getUsername,
  logout,
  login,
  createNewUser,
};

chai.use(chaiHttp);
chai.should();

describe("test /", () => {
  describe("Health check on /", () => {
    it("should get a 200 and be an array", done => {
      chai
        .request(app)
        .get("/users/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
