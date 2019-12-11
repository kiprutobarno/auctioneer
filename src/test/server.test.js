import { expect } from "chai";
import request from "supertest";
import app from "../server";

describe("Auctioneer", () => {
  describe("GET /", () => {
    it("responds with json", done => {
      request(app)
        .get("/")
        .set("Accept", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });
  });
  describe("POST /register", () => {
    let users = [
      { email: "a@gmail.com", password: "a123" },
      { email: "b@gmail.com", password: "b123" }
    ];
    it("should respond with a 201 status", done => {
      for (let i = 0; i < users.length; i++) {
        request(app)
          .post("/register")
          .send(users[i])
          .end((err, res) => {
            expect(res.status).to.equal(201);
            if (err) return done(err);
          });
      }
      done();
    });
  });
});
