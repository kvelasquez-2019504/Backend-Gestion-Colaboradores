"use strict";
import mysql from "mysql2/promise";
import { PrismaClient } from "@prisma/client";
import { PRISMA_ERRORS, GENERAL_ERRORS } from './prismaErrors.js';
import dotenv from "dotenv";

dotenv.config();

export const verifyDB = async () => {
    // Crear conexión sin especificar la base de datos
    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST || "localhost",
        user: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASSWORD || "",
        port: process.env.DATABASE_PORT || 3306,
    });

    // Crear la base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`);
    console.log(`Base de datos '${process.env.DATABASE_NAME}' verificada/creada.`);

    // Usar la base de datos
    await connection.query(`USE ${process.env.DATABASE_NAME}`);

    // Crear la tabla si no existe
    await connection.query(`
                CREATE TABLE IF NOT EXISTS COLABORADOR (
                    IDCOLABORADOR INT(11) AUTO_INCREMENT PRIMARY KEY,
                    NOMBRE VARCHAR(45) NOT NULL,
                    APELLIDO VARCHAR(45) NOT NULL,
                    DIRECCION VARCHAR(45),
                    EDAD INT(3) NOT NULL,
                    PROFESION VARCHAR(45),
                    ESTADOCIVIL VARCHAR(45)
                );
            `);
    console.log("Tabla 'COLABORADOR' verificada/creada.");

    // Ingresar al colaborador principal/admin si no existe
    const [rows] = await connection.query("SELECT * FROM COLABORADOR WHERE IDCOLABORADOR = 1");
    if (rows.length === 0) {
        await connection.query(`
            INSERT INTO COLABORADOR (IDCOLABORADOR, NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL)
            VALUES (1, 'Admin', 'Admin', 'Admin', 1, 'Admin', 'Admin');
        `);
        console.log("Colaborador principal verificado/creado.");
    }

    // Cerrar conexión temporal
    await connection.end();
}

export const connectDBMysql = async () => {
    try {
        await verifyDB();
        try {
            // Inicializar Prisma después de verificar la BD
            const prisma = new PrismaClient();
            // Establecer conexión con Prisma
            await prisma.$connect();
            console.log("Conexión establecida con Prisma.");

            // Cerrar conexión con Prisma
            await prisma.$disconnect();
            console.log("Conexión cerrada con Prisma.");
        } catch (error) {
            const ERROR = PRISMA_ERRORS;
            switch (error.code) {
                case ERROR.NOT_FOUND.CODE: // Registro no encontrado
                    throw new NotFoundException(ERROR.NOT_FOUND.MESSAGE);
                case ERROR.UNIQUE_VIOLATION.CODE: // Violación de restricción de unicidad
                    throw new ConflictException(ERROR.UNIQUE_VIOLATION.MESSAGE);
                case ERROR.FOREIGN_KEY_VIOLATION.CODE: // Error en la clave foránea
                    throw new BadRequestException(ERROR.FOREIGN_KEY_VIOLATION.MESSAGE);
                case ERROR.PRIMARY_KEY_VIOLATION.CODE: // Violación de clave primaria
                    throw new ConflictException(ERROR.PRIMARY_KEY_VIOLATION.MESSAGE);
                case ERROR.INCORRECT_DATA_TYPE.MESSAGE: // Tipo de datos incorrecto
                    throw new BadRequestException(ERROR.INCORRECT_DATA_TYPE.MESSAGE);
                case ERROR.RELATION_UPDATE_ERROR.CODE: // Error al actualizar la relación
                    throw new BadRequestException(ERROR.RELATION_UPDATE_ERROR.MESSAGE);
                case ERROR.RELATED_RECORD_NOT_FOUND.CODE: // No se encontró el registro relacionado
                    throw new NotFoundException(ERROR.RELATED_RECORD_NOT_FOUND.MESSAGE);
                case ERROR.INVALID_FILTER.CODE: // Filtro no válido en la consulta
                    throw new BadRequestException(ERROR.INVALID_FILTER.MESSAGE);
                default:
                    throw new Error(GENERAL_ERRORS.INTERNAL_SERVER_ERROR);
            }
        }
    } catch (error) {
        console.error(error);
    }
};
