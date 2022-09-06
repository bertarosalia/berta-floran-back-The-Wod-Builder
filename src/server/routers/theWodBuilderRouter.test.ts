import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "..";
import connectDB from "../../database";
import Exercise from "../../database/models/Exercise";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoURL = mongoServer.getUri();
  await connectDB(mongoURL);
});

afterEach(async () => {
  await Exercise.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given the endpoint GET /exercises", () => {
  describe("When it receives a request and there are not exercises in database", () => {
    test("Then it should response with a not found error with status 404", async () => {
      const expectedStatus = 404;

      await request(app).get("/exercises").expect(expectedStatus);
    });
  });
});
