import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundError } from "./middlewares/errors";
import exercisesRouter from "./routers/exercisesRouter/exercisesRouter";
import userRouter from "./routers/usersRouter/usersRouter";

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/exercises", exercisesRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
