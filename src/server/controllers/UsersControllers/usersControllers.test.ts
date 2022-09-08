import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../../database/models/User";
import registerUser from "./usersController";
import CustomError from "../../../utils/CustomError";

describe("Given a registerUser controller", () => {
  const exampleUser = {
    name: "Ana",
    eMail: "ana@ana.com",
    password: "1234",
  };

  const exampleRequest = {
    body: {
      user: exampleUser,
    },
  } as Partial<Request>;

  const exampleRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const bcryptHashExample = jest.fn().mockResolvedValue("test");
  (bcrypt.hash as jest.Mock) = bcryptHashExample;

  const exampleNext = jest.fn();

  describe("When it receives an object as a response", () => {
    test("Then it should invoke the response method with status '201'", async () => {
      const status = 201;

      User.create = jest.fn();

      await registerUser(
        exampleRequest as Request,
        exampleRes as Response,
        exampleNext as NextFunction
      );

      expect(exampleRes.status).toHaveBeenCalledWith(status);
    });
  });
  test("Then it should invoke the response method json with a new user", async () => {
    User.create = jest.fn().mockResolvedValue(exampleUser);

    await registerUser(
      exampleRequest as Request,
      exampleRes as Response,
      exampleNext as NextFunction
    );

    expect(exampleRes.json).toHaveBeenCalledWith({ user: exampleUser });
  });

  describe("When it doesn't receceives an user with required properties", () => {
    test("Then it should nexted an error", async () => {
      const exampleError = new CustomError(404, "Error", "Public Error");
      User.create = jest.fn().mockRejectedValue(exampleError);

      await registerUser(
        exampleRequest as Request,
        exampleRes as Response,
        exampleNext as NextFunction
      );

      expect(exampleNext).toBeCalledWith(exampleError);
    });
  });
});
