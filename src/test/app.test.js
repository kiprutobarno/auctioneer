import chai from "chai";
import { expect } from "chai";
import http from "chai-http";
import app from "../app";
import database from "../utils/db";

chai.use(http);
chai.should();

describe("TEST API ENDPOINTS", () => {
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
    it("should register user", done => {
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

    it("should login user", done => {
      chai
        .request(app)
        .post("/api/v1/register")
        .send(user)
        .end((err, res) => {
          chai
            .request(app)
            .post("/api/v1/login")
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
  });

  describe("POST, /api/v1/owners", () => {
    let owner = {
      firstName: "John",
      lastName: "Doe",
      email: "doe@gmail.com",
      dateCreated: "2019-12-15T22:31:12.000Z",
      dateModified: "2019-12-15T22:31:12.000Z"
    };
    let user = { email: "e@gmail.com", password: "b123" };

    it("should authorize user and then create an owner", done => {
      /** Register test user */
      chai
        .request(app)
        .post("/api/v1/register")
        .send(user)
        .end((err, res) => {
          /** Login  test user */
          chai
            .request(app)
            .post("/api/v1/login")
            .send(user)
            .end((err, res) => {
              /** Authorize test user */
              chai
                .request(app)
                .post("/api/v1/owners")
                .set("Authorization", "Bearer " + res.body.token)
                .send(owner)
                .end((err, res) => {
                  /** Create test owner */
                  res.should.have.status(201);
                  res.body.should.have.property("message");
                  done();
                });
            });
        });
    });
  });

  describe("GET, /api/v1/owners", () => {
    let owner = {
      firstName: "John",
      lastName: "Doe",
      email: "doe@gmail.com",
      dateCreated: "2019-12-15T22:31:12.000Z",
      dateModified: "2019-12-15T22:31:12.000Z"
    };
    let user = { email: "e@gmail.com", password: "b123" };

    it("should authorize user and then get owner records", done => {
      /** Register test user */
      chai
        .request(app)
        .post("/api/v1/register")
        .send(user)
        .end((err, res) => {
          /** Login test user */
          chai
            .request(app)
            .post("/api/v1/login")
            .send(user)
            .end((err, res) => {
              /** Authorize test user */
              let token = res.body.token;
              chai
                .request(app)
                .post("/api/v1/owners")
                .set("Authorization", "Bearer " + token)
                .send(owner)
                .end((err, res) => {
                  /** Get test users records */
                  chai
                    .request(app)
                    .get("/api/v1/owners")
                    .set("Authorization", "Bearer " + token)
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("message");
                      done();
                    });
                });
            });
        });
    });
  });
});
