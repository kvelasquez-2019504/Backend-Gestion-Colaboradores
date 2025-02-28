"use strict";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDBMysql } from "./connectionDB.js";
import colaboratorRoutes  from "../src/entities/colaborator/colaborator.routes.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.colaboratorsPath = "/";
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await connectDBMysql();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan("dev"));
    }
    routes() {
        this.app.use(this.colaboratorsPath, colaboratorRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is running on port: ", this.port);
        });
    }
}
export default Server;