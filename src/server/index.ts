import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundError } from "./middlewares/errors";
import theWodBuilderRouter from "./routers/theWodBuilderRouter";

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/theWodBuilder", theWodBuilderRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
