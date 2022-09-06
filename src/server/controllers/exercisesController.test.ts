import { NextFunction, Request, Response } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDB from "../../database";
import Exercise from "../../database/models/Exercise";
import ExerciseCreate from "../../types/exercisesInterface";
import { deleteExercise, getExercises } from "./exercisesControllers";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoURL = mongoServer.getUri();

  await connectDB(mongoURL);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

const exampleRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;

describe("Given an endpoint GET /exercises", () => {
  describe("When it receives a request", () => {
    test("Then it should response with a status code 200, and a mockExercise", async () => {
      const exampleExercise: ExerciseCreate = {
        body: "leg",
        name: "deadlift",
        description: "",
        image: "",
      };
      const exampleRequest = {
        body: {
          exercise: exampleExercise,
        },
      } as Partial<Request>;

      Exercise.find = jest.fn();

      const expectedStatusCode = 200;

      await getExercises(exampleRequest as Request, exampleRes as Response);

      expect(exampleRes.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
describe("Given an endopoint DELETE", () => {
  describe("When it receives a request with a delete exercise controller and a valid id", () => {
    test("Then it should response with a method status and a 'Successfully deleted exercise' message", async () => {
      const expectedJsonMessage = { message: "Successfully deleted exercise" };
      const exampleRequest = {
        params: { id: "12" },
      } as Partial<Request>;

      const next = jest.fn() as NextFunction;
      Exercise.findByIdAndDelete = jest.fn().mockResolvedValue(exampleRequest);
      const expectedStatus = 200;

      await deleteExercise(
        exampleRequest as Request,
        exampleRes as Response,
        next as NextFunction
      );

      expect(exampleRes.status).toHaveBeenCalledWith(expectedStatus);
      expect(exampleRes.json).toHaveBeenCalledWith(expectedJsonMessage);
    });
  });
});
