import express from "express";
import "express-async-errors";

import cors from "cors";
import routes from "./routes";
import AppError from "./errors/AppError";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
    this.start();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use((err, request, response, _) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: "error",
          message: err.message,
        });
      }

      console.log(err);

      return response.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    });
  }

  start() {
    this.server.listen(3333);
  }
}

export default new App().server;
