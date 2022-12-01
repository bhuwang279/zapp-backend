import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { AuthenticationError, AUTH_ERROR } from "./helpers/errors";
import "dotenv/config";
import responseTime from "response-time";
import jwt from "jsonwebtoken";
import routes from "./routes";
import chalk from "chalk";

const port = process.env.PORT || 8000;

const getMe = async (req) => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        AUTH_ERROR.INVALID_TOKEN,
        "Please provide valid token"
      );
    }
  }
};

const app = express();
const path = require("path");
app.use("/static", express.static(path.join(__dirname, "assets")));
app.use(cors({ credentials: true, origin: true }));
app.set("port", port);
app.set("express", express);
app.use(bodyParser.json());
app.use(responseTime());
routes(app);

app.listen({ port }, () => {
  console.log(
    `%s App API is running at http://localhost:%d in mode:%s`,
    chalk.green("✓"),
    app.get("port"),
    chalk.blue(app.get("env"))
  );
  console.log(`  Press ${chalk.red("ctrl-c")} to stop`);
});
