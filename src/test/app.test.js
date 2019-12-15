import chai from "chai";
import http from "chai-http";
import app from "../app";
import database from "../utils/db";

chai.use(http);
chai.should();

describe("Auctioneer", () => {
  beforeEach(done => {
    database.clear();
    done();
  });
  describe("POST api/v1/register", () => {
    let users = [
      { email: "a@gmail.com", password: "a123" },
      { email: "b@gmail.com", password: "b123" },
      { email: "c@gmail.com", password: "b123" }
    ];
    it("user should register", done => {
      for (let i = 0; i < users.length; i++) {
        chai
          .request(app)
          .post("/api/v1/register")
          .send(users[i])
          .end((err, res) => {
            res.should.have.status(201);
          });
      }
      done();
    });
  });

  describe("POST /api/v1/login", () => {
    let user = { email: "d@gmail.com", password: "b123" };

    it("user should log in", done => {
      chai
        .request(app)
        .post("/api/v1/register")
        .send(user)
        .end(done());
      chai
        .request(app)
        .post("/api/v1/login")
        .send((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
