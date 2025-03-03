"use strict";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDBMysql } from "./connectionDB.js";
import colaboratorRoutes from "../src/entities/colaborator/colaborator.routes.js";
import swaggerUi from 'swagger-ui-express'
import apiLimiter from "../src/middlewares/limit-petitions.js";
import { swaggerSpec } from "./swaggerConfig.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.colaboratorsPath = "/";
        this.documentationPath = "/documentation";
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
        this.app.use(apiLimiter);
    }
    routes() {
        this.app.use(this.colaboratorsPath, colaboratorRoutes)
        this.app.use(this.documentationPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.app.use((req, res, next) => {
            res.status(404).json({
                error: 'Ruta invá',
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is running on port: ", this.port);
        });
    }
}
export default Server;