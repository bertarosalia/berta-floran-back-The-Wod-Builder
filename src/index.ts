import connectDB from "./database";
import "./loadEnvironment";
import startServer from "./server/startServer";

const port = +process.env.PORT || 4000;
const mongoURL = process.env.MONGODB_URL;

(async () => {
  try {
    await connectDB(mongoURL);
    await startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
