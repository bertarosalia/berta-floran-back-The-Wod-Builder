import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../..";
import connectDB from "../../../database";
import Exercise from "../../../database/models/Exercise";

let mongoServer: MongoMemoryServer;

const ExerciseTest = {
  name: "front squat",
  body: "legs",
  description: "jjjvsdbfk",
  image: "url",
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoURL = mongoServer.getUri();
  await connectDB(mongoURL);

  await Exercise.create(ExerciseTest);
});

afterEach(async () => {
  await Exercise.deleteMany({});
});

afterAll(async () => {
  Exercise.deleteMany();

  await mongoose.connection.close();
  await mongoServer.stop();
  jest.clearAllMocks();
});

describe("Given the endpoint GET /exercises", () => {
  describe("When it receives a request with method get", () => {
    test("Then it should response with status 200", async () => {
      const expectedStatus = 200;

      await request(app).get("/exercises").expect(expectedStatus);
    });
  });
});

describe("When use the endpoint POST exercises/create", () => {
  describe("And receives a correct request with exercises info", () => {
    test("Then it should response with the new exercise created", async () => {
      const expectedStatus = 200;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { body } = await request(app)
        .post("/exercises/create")
        .field("name", "snatch")
        .expect(expectedStatus);
    });
  });
});
