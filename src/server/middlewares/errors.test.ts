import { Response, Request, NextFunction } from "express";
import CustomError from "../../utils/CustomError";
import { generalError, notFoundError } from "./errors";

describe("Given a general error function", () => {
  const exampleReq = {};
  const exampleNext = jest.fn();

  describe("When is called", () => {
    test("Then it should response with status method with the received error message and code", async () => {
      const exampleError: CustomError = {
        code: "125",
        publicMessage: "Everything went wrong",
        message: "",
        name: "",
        statusCode: 254,
      };

      const exampleRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(exampleError.publicMessage),
      };

      const status = 254;
      const responseJson = { error: exampleError.publicMessage };

      await generalError(
        exampleError as CustomError,
        exampleReq as unknown as Request,
        exampleRes as unknown as Response,
        exampleNext as NextFunction
      );

      expect(exampleRes.status).toBeCalledWith(status);
      expect(exampleRes.json).toBeCalledWith(responseJson);
    });
  });
  describe("When it's called with a status code null", () => {
    test("Then it should respond with a status code 500", async () => {
      const error: CustomError = {
        publicMessage: "",
        code: "",
        message: "",
        name: "",
        statusCode: 500,
      };

      const exampleRequest = {};
      const exampleResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(error.publicMessage),
      };

      const nextExample = jest.fn();

      const expectedStatus = error.statusCode;

      await generalError(
        error as CustomError,
        exampleRequest as unknown as Request,
        exampleResponse as unknown as Response,
        nextExample as NextFunction
      );

      expect(exampleResponse.status).toBeCalledWith(expectedStatus);
    });
  });
  describe("When instantiated with a null public message", () => {
    test("Then it shold response wit a public message 'Everything went wrong'", async () => {
      const error: CustomError = {
        publicMessage: null,
        code: "",
        message: "",
        name: "",
        statusCode: 125,
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(error.publicMessage),
      } as Partial<Response>;

      const expectedResponse = { error: "Everything went wrong" };

      generalError(
        error,
        exampleReq as Request,
        response as Response,
        exampleNext
      );

      expect(response.json).toBeCalledWith(expectedResponse);
    });
  });
});
describe("Given a not found error middleware", () => {
  describe("When it receives a response object", () => {
    const exampleResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const exampleRequest = {} as Partial<Request>;

    test("The it should call the response method status with code 404", () => {
      const status = 404;

      notFoundError(exampleRequest as Request, exampleResponse as Response);

      expect(exampleResponse.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call the response method with a json object and an error property", () => {
      const errorResponse = { error: "Endpoint not found" };

      notFoundError(exampleRequest as Request, exampleResponse as Response);

      expect(exampleResponse.json).toHaveBeenCalledWith(errorResponse);
    });
  });
});
