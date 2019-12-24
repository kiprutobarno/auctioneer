import { chai, expect, app, db } from "./testConfig";

describe("Owners", () => {
  /* Before hook*/
  before(async () => {
    await db.createUsersTable();
    await db.createOwnersTable();
  });

  /** After hook */
  after(async () => {
    await db.clear("owners");
    await db.clear("users");
  });

  /** Test create owner endpoint */
  describe("POST /api/v1/owners", () => {
    let owner = {
      firstName: "John",
      lastName: "Doe",
      email: "test@test.com",
      dateCreated: "2019-12-15T22:31:12.000Z",
      dateModified: "2019-12-15T22:31:12.000Z"
    };
    let invalidEmailOwner = {
      firstName: "John",
      lastName: "Doe",
      email: "test.com",
      dateCreated: "2019-12-15T22:31:12.000Z",
      dateModified: "2019-12-15T22:31:12.000Z"
    };

    let incompleteOwner = {
      firstName: "",
      lastName: "Doe",
      email: "test.com",
      dateCreated: "2019-12-15T22:31:12.000Z",
      dateModified: "2019-12-15T22:31:12.000Z"
    };

    let user = { email: "e@gmail.com", password: "b123" };

    it("should not create an owner with incomplete data", async () => {
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
          .send(incompleteOwner);

        /**tests */
        expect(created.body).to.have.status(400);
        expect(created.body).to.have.property(
          "message",
          "Some values are missing"
        );
      } catch (error) {
        console.log(error);
      }
    });

    it("should not create an owner with invalid email address", async () => {
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
          .send(invalidEmailOwner);

        /**tests */
        expect(created.body).to.have.status(400);
        expect(created.body).to.have.property(
          "message",
          "Please enter a valid email"
        );
      } catch (error) {
        console.log(error);
      }
    });

    it("should not allow unauthorized user create an owner", async () => {
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
          .send(owner);

        /**tests */
        expect(created.body).to.have.status(401);
        expect(created.body).to.have.property(
          "message",
          "Missing  access token in header"
        );
      } catch (error) {
        console.log(error);
      }
    });

    it("should authorize a registered user to create a valid owner", async () => {
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
        expect(created.body).to.have.property(
          "message",
          "User successfully created"
        );
      } catch (error) {
        console.log(error);
      }
    });
  });
  /** Test get owners endpoint */
  describe("GET /api/v1/owners", () => {
    let owner = {
      firstName: "John",
      lastName: "Doe",
      email: "doe@gmail.com",
      dateCreated: "2019-12-15T22:31:12.000Z",
      dateModified: "2019-12-15T22:31:12.000Z"
    };
    let user = { email: "e@gmail.com", password: "b123" };

    it("should not allow unauthorized user to retrieve owner records", async () => {
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
        let owners = await chai.request(app).get("/api/v1/owners");

        /**tests */
        expect(owners.body).to.have.status(401);
        expect(owners.body).to.have.property(
          "message",
          "Missing  access token in header"
        );
      } catch (error) {
        console.log(error);
      }
    });

    it("should allow an authorized user to retrieve owner records", async () => {
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
        expect(owners.body).to.have.property("message", "Success");
      } catch (error) {
        console.log(error);
      }
    });
  });
});
