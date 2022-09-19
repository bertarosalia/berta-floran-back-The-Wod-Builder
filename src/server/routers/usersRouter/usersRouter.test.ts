import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../..";
import connectDB from "../../../database";
import User from "../../../database/models/User";

let mongoServer: MongoMemoryServer;
const userTest = {
  name: "Ana",
  email: "ana@ana.com",
  password: "admin",
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoURL = mongoServer.getUri();
  User.create(userTest);
  await connectDB(mongoURL);
});

afterAll(async () => {
  User.deleteMany();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given the endpoint POST /users/register", () => {
  describe("When it receives a request with an user", () => {
    test("Then it should response with an status 201 a message 'User created'", async () => {
      const message = "User created";
      const { body } = await request(app)
        .post("/user/register")
        .send({
          name: "Berta",
          email: "berta@berta.com",
          password: "125",
        })
        .expect(201);

      expect(body).toHaveProperty("message", message);
    });
  });

  describe("When it receives a request with an existent name", () => {
    test("Then it should response with status 400 and a message 'Error creating new user'", async () => {
      const message = "Error creating new user";
      const { body } = await request(app)
        .post("/user/register")
        .send(userTest)
        .expect(400);

      expect(body).toHaveProperty("error", message);
    });
  });
});
