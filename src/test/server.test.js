import chai from "chai";
import http from "chai-http";
import server from "../server";
import database from "../utils/db";

chai.use(http);
chai.should();

after(() => {
  database.clear();
});

describe("Auctioneer", () => {
  describe("POST /register", () => {
    let users = [
      { email: "a@gmail.com", password: "a123" },
      { email: "b@gmail.com", password: "b123" },
      { email: "c@gmail.com", password: "b123" }
    ];
    it("user should register", done => {
      for (let i = 0; i < users.length; i++) {
        chai
          .request(server)
          .post("/register")
          .send(users[i])
          .end((err, res) => {
            res.should.have.status(201);
          });
      }
      done();
    });
  });

  describe("POST /login", () => {
    let user = { email: "d@gmail.com", password: "b123" };

    it("user should log in", done => {
      chai
        .request(server)
        .post("/register")
        .send(user)
        .end(done());
      chai
        .request(server)
        .post("/login")
        .send((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
