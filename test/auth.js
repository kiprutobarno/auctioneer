import { chai, expect, app, db } from "./testConfig";

describe("Authentication", () => {
  /* Before hook*/
  before(async () => {
    await db.createUsersTable();
  });

  /** After hook */
  after(async () => {
    await db.clear("users");
  });

  /** Test register owner endpoint */
  describe("POST /api/v1/register", () => {
    const blank = { email: "", password: "" };
    const testUser = { email: "test@testmail.com", password: "test123" };
    const testUser1 = { email: "test1@testmail.com", password: "test123" };
    const invalidEmail = { email: "testmail.com", password: "test123" };

    it("should reject blank user registration data", async () => {
      try {
        let { body } = await chai
          .request(app)
          .post("/api/v1/register")
          .send(blank);
        expect(body).to.have.status(400);
      } catch (error) {
        console.log(error);
      }
    });

    it("should reject an invalid email address", async () => {
      try {
        let { body } = await chai
          .request(app)
          .post("/api/v1/register")
          .send(invalidEmail);
        expect(body).to.have.status(400);
      } catch (error) {
        console.log(error);
      }
    });

    it("should reject an already registered email", async () => {
      try {
        await chai
          .request(app)
          .post("/api/v1/register")
          .send(testUser1);
        let { body } = await chai
          .request(app)
          .post("/api/v1/register")
          .send(testUser1);
        expect(body).to.have.status(409);
        expect(body).to.have.property("message", "Email already registered");
      } catch (error) {
        console.log(error);
      }
    });

    it("should register only a user with valid credentials", async () => {
      try {
        let { body } = await chai
          .request(app)
          .post("/api/v1/register")
          .send(testUser);
        expect(body).to.have.status(201);
      } catch (error) {
        console.log(error);
      }
    });
  });

  /** Test user login endpoint */
  describe("POST /api/v1/login", () => {
    let user = { email: "test@gtest.com", password: "test123" };
    let unregisteredUser = { email: "test@gmail.com", password: "123test" };
    let rightPassword = {
      email: "test@rightpasword.com",
      password: "right123"
    };
    let wrongPassword = {
      email: "test@rightpasword.com",
      password: "wrong123"
    };
    let blankUser = { email: "", password: "" };

    it("should reject a user with blank credentials", async () => {
      try {
        let { body } = await chai
          .request(app)
          .post("/api/v1/login")
          .send(blankUser);

        /**tests */
        expect(body).to.have.status(400);
        expect(body).to.have.property("message", "Missing email or password");
      } catch (error) {
        console.log(error);
      }
    });

    it("should reject an unregistered user", async () => {
      try {
        let { body } = await chai
          .request(app)
          .post("/api/v1/login")
          .send(unregisteredUser);

        /**tests */
        expect(body).to.have.status(401);
        expect(body).to.have.property("message", "Email not registered");
      } catch (error) {
        console.log(error);
      }
    });

    it("should reject a user with wrong password credential", async () => {
      try {
        await chai
          .request(app)
          .post("/api/v1/register")
          .send(rightPassword);

        let { body } = await chai
          .request(app)
          .post("/api/v1/login")
          .send(wrongPassword);

        /**tests */
        expect(body).to.have.status(401);
        expect(body).to.have.property("message", "Wrong password");
      } catch (error) {
        console.log(error);
      }
    });

    it("should login a user with valid credentials", async () => {
      try {
        await chai
          .request(app)
          .post("/api/v1/register")
          .send(user);
        let { body } = await chai
          .request(app)
          .post("/api/v1/login")
          .send(user);

        /**tests */
        expect(body).to.have.status(200);
        expect(body).to.have.property("message", "Login successful");
      } catch (error) {
        console.log(error);
      }
    });

    it("should generate tokens on successful login", async () => {
      try {
        await chai
          .request(app)
          .post("/api/v1/register")
          .send(user);
        let { body } = await chai
          .request(app)
          .post("/api/v1/login")
          .send(user);

        /**tests */
        expect(body).to.have.property("token");
      } catch (error) {
        console.log(error);
      }
    });
  });
});
