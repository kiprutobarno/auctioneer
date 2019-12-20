import "dotenv/config";
import { expect } from "chai";
import chai from "chai";
import http from "chai-http";
import app from "../src/app";
import database from "../src/utils/db";

chai.use(http);
chai.should();

describe("Auctioneer", () => {
  /* Before hook*/
  before(async () => {
    await database.createUsersTable();
    await database.createOwnersTable();
    await database.createCategoriesTable();
    await database.createItemsTable();
  });
  /** After hook */
  after(async () => {
    await database.dropItemsTable();
    await database.dropCategoriesTable();
    await database.dropOwnersTable();
    await database.dropUsersTable();
  });

  /** Test register owner endpoint */
  describe("POST api/v1/register", () => {
    let users = [
      { email: "a@gmail.com", password: "a123" },
      { email: "b@gmail.com", password: "b123" },
      { email: "c@gmail.com", password: "b123" }
    ];
    it("user should register", async () => {
      try {
        for (let i = 0; i < users.length; i++) {
          let { body } = await chai
            .request(app)
            .post("/api/v1/register")
            .send(users[i]);
          expect(body).to.have.status(201);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });

  /** Test user login endpoint */
  describe("POST /api/v1/login", () => {
    let user = { email: "d@gmail.com", password: "b123" };

    it("user should log in", async () => {
      try {
        await chai
          .request(app)
          .post("/api/v1/register")
          .send(user);
        let { body, token } = await chai
          .request(app)
          .post("/api/v1/login")
          .send(user);

        /**tests */
        expect(body).to.have.status(200);
      } catch (error) {
        console.log(error);
      }
    });
  });

  /** Test create owner endpoint */
  describe("POST, /api/v1/owners", () => {
    let owner = {
      firstName: "John",
      lastName: "Doe",
      email: "doe@gmail.com",
      dateCreated: "2019-12-15T22:31:12.000Z",
      dateModified: "2019-12-15T22:31:12.000Z"
    };
    let user = { email: "e@gmail.com", password: "b123" };

    it("should authorize user and then create an owner", async () => {
      try {
        /** Register test user */
        await chai
          .request(app)
          .post("/api/v1/register")
          .send(user);

        /* Login test user*/
        let { body } = await chai
          .request(app)
          .post("/api/v1/login")
          .send(user);

        /* Set token and create owner */
        let created = await chai
          .request(app)
          .post("/api/v1/owners")
          .set("Authorization", "Bearer " + body.token)
          .send(owner);

        /**tests */
        expect(created.body).to.have.status(201);
      } catch (error) {
        console.log(error);
      }
    });
  });

  /** Test get owners endpoint */
  describe("GET, /api/v1/owners", () => {
    let owner = {
      firstName: "John",
      lastName: "Doe",
      email: "doe@gmail.com",
      dateCreated: "2019-12-15T22:31:12.000Z",
      dateModified: "2019-12-15T22:31:12.000Z"
    };
    let user = { email: "e@gmail.com", password: "b123" };

    it("should authorize user and then get owner records", async () => {
      try {
        /** Register test user */
        await chai
          .request(app)
          .post("/api/v1/register")
          .send(user);

        /*User login */
        let { body } = await chai
          .request(app)
          .post("/api/v1/login")
          .send(user);

        /* Create owner */
        await chai
          .request(app)
          .post("/api/v1/owners")
          .set("Authorization", "Bearer " + body.token)
          .send(owner);

        /* Get owner */
        let owners = await chai
          .request(app)
          .get("/api/v1/owners")
          .set("Authorization", "Bearer " + body.token);

        /**tests */
        expect(owners.body).to.have.status(200);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
