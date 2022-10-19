import { NextFunction, Request, Response } from "express";
import Exercise from "../../../database/models/Exercise";
import { ExerciseUpdated } from "../../../types/exercisesInterface";
import CustomError from "../../../utils/CustomError/CustomError";
import {
  createExercise,
  deleteExercise,
  getOneExerciseById,
  getAllExercises,
  updateExercise,
} from "./exercisesControllers";

let next = jest.fn() as NextFunction;

beforeAll(() => {
  next = jest.fn();
});

afterAll(() => {
  jest.clearAllMocks();
});

jest.mock("../../../database/models/Exercise", () => ({
  find: jest.fn().mockReturnValue([
    {
      id: "2151",
      body: "legs",
      name: "back squat",
      description: "",
      image: "http",
    },
  ]),
}));

describe("Given a controller get all exercises", () => {
  describe("When it receives a request", () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should response with a status code 200, and a mockExercise", async () => {
      const mockExerciseList = [{ exercise: "" }];
      Exercise.find = jest.fn().mockResolvedValue(mockExerciseList);

      await getAllExercises(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });
    describe("When called but doesn´t return any valid data", () => {
      test("Then call next function with an error", async () => {
        Exercise.find = jest.fn().mockRejectedValue(new Error());

        const expectedError = new CustomError(
          404,
          "No exercises in database",
          "Exercises not found"
        );

        await getAllExercises(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});

describe("Given a controller delete one exercise by id", () => {
  describe("When it receives a request with a delete exercise controller and a valid id", () => {
    test("Then it should response with a method status and a 'Successfully deleted exercise' message", async () => {
      const expectedJsonMessage = { message: "Successfully deleted exercise" };
      const req = {
        params: { id: "12" },
      } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Exercise.findByIdAndDelete = jest.fn().mockResolvedValue(req);
      const expectedStatus = 200;

      await deleteExercise(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJsonMessage);
    });
    describe("When it receives a request to delete an item but can´t find it", () => {
      test("It should throw a custom error with 404 as code", async () => {
        const requestExample = {
          params: { id: "" },
        } as Partial<Request>;

        const expectedError = new CustomError(
          404,
          "No exercises found",
          "Error deleting exercise"
        );

        Exercise.findByIdAndDelete = jest.fn().mockRejectedValue(expectedError);

        const responseExample = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as Partial<Response>;

        await deleteExercise(
          requestExample as Request,
          responseExample as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(expectedError);
      });
      describe("When it receives a request to delete an exercise, but the value is null", () => {
        test("Then it should send a response with the method status 404", async () => {
          const requestTest = {
            params: { id: "515165" },
          } as Partial<Request>;

          const expectedResult: void = null;

          Exercise.findByIdAndDelete = jest
            .fn()
            .mockResolvedValue(expectedResult);

          const expectedStatus = 200;

          const responseTest = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
          } as Partial<Response>;

          await deleteExercise(
            requestTest as Request,
            responseTest as Response,
            next
          );

          expect(responseTest.status).toHaveBeenCalledWith(expectedStatus);
        });
      });
    });
  });
});

describe("Given a controller get one exercise by id", () => {
  describe("When it´s called with a correct id", () => {
    test("Then it should response with a status 200", async () => {
      const req = {
        params: { id: "12" },
      } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Exercise.findById = jest.fn().mockResolvedValue(req);
      const expectedStatus = 200;

      await getOneExerciseById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    describe("When it receives a request to find one exercise with incorrect id", () => {
      test("It should throw a custom error with 404 as code", async () => {
        const requestExample = {
          params: { id: "" },
        } as Partial<Request>;

        const expectedError = new CustomError(
          404,
          "Element not found",
          "Cannot response to this request"
        );

        Exercise.findById = jest.fn().mockRejectedValue(expectedError);

        const responseExample = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as Partial<Response>;

        await getOneExerciseById(
          requestExample as Request,
          responseExample as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});

describe("Given a create exercise controller", () => {
  describe("When it's invoke with an empty idExercise", () => {
    test("Then it should call next function with an error", async () => {
      const bodyExercise = {};

      const req: Partial<Request> = {
        body: bodyExercise,
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const ErrorCustomTest = new CustomError(
        400,
        "Error creating new exercise",
        "Cannot create an exercise"
      );

      Exercise.create = jest.fn().mockRejectedValue(new Error());

      await createExercise(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(ErrorCustomTest);
    });
  });
});

describe("Given a update exercise controller", () => {
  describe("When called with a request, a response and a next function", () => {
    test("Then it should response with a status code 200 and the modified exercise", async () => {
      const modifiedExercise: ExerciseUpdated = {
        id: "1254485",
        body: "body part",
        name: "exercise name",
        description: "what to do",
        image: "how to do",
      };
      const requestTest = {
        body: modifiedExercise,
        params: { exerciseId: "jhvfbhfbhv" },
      } as Partial<Request>;

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({ modifiedExercise }),
      };

      Exercise.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(modifiedExercise);

      const expectedStatus = 200;
      await updateExercise(requestTest as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ modifiedExercise });
    });
    test("Then it should next with an error if it cannot complete the update", async () => {
      const errorTest = new CustomError(
        400,
        "Error updating exercise",
        "Cannot update exercise"
      );

      Exercise.findByIdAndUpdate = jest.fn().mockRejectedValue(errorTest);

      const req = {
        params: { exerciseId: "" },
      } as Partial<Request>;

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue([]),
      };

      await updateExercise(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(errorTest);
    });
  });
});
