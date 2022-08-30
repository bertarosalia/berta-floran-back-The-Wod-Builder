import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import ICustomError from "../../types/errorsInterface";

const debug = Debug("the-wod-builder:server:middlewares:errors");

export const notFoundError = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalError = (
  error: ICustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errorCode = error.code ?? 500;
  const errorMessage = error.publicMessage ?? "Everything went wrong";

  debug(chalk.red(error.message));

  res.status(errorCode).json({ error: errorMessage });
};
