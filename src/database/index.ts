import "../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";

const debug = Debug("the-wod-builder:database:index");

const connectDB = (mongoUrl: string) =>
  new Promise((resolve, reject) => {
    mongoose.connect(mongoUrl, (error) => {
      if (error) {
        debug(chalk.red("Error connecting to database", error.message));
        reject(error);
        return;
      }

      debug(chalk.blue("Connected to database"));
      resolve(true);
    });
  });

export default connectDB;
