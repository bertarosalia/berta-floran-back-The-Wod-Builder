import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import userRegister from "./usersController";
import CustomError from "../../../utils/CustomError/CustomError";

describe("Given a registerUser controller", () => {
  const exampleUser = {
    name: "",
    eMail: "",
    password: "",
  };

  const exampleRequest = {
    body: exampleUser,
  } as Partial<Request>;

  const exampleRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const exampleNext: Partial<NextFunction> = jest.fn();

  describe("When it receives an object as a response", () => {
    test("Then it should invoke the response method with status '201'", async () => {
      const status = 201;

      User.create = jest.fn();

      await userRegister(
        exampleRequest as Request,
        exampleRes as Response,
        exampleNext as NextFunction
      );

      expect(exampleRes.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When it doesn't receceives an user with required properties", () => {
    test("Then it should nexted an error", async () => {
      const exampleError = new CustomError(404, "Error", "Public Error");
      User.create = jest.fn().mockRejectedValue(exampleError);

      await userRegister(
        exampleRequest as Request,
        exampleRes as Response,
        exampleNext as NextFunction
      );

      expect(exampleNext).toBeCalledWith(exampleError);
    });
  });
});
