import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routers from "./app/routers";
import "./database";

class App {
  constructor() {
    this.server = express();
    this.config();
    this.routers();
    this.errorHandler();
  }

  config() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cors());

    dotenv.config({
      path: process.env.NODE_ENV === "test" ? "./../.env.test" : "./../.env",
    });
  }

  routers() {
    this.server.use(routers);
  }

  errorHandler() {
    this.server.use((error, request, response, next) =>
      response.status(error.status).json({
        message: error.message,
      })
    );
  }
}

export default new App().server;
