"use strict";
import { PrismaClient } from '@prisma/client'
import { PRISMA_ERRORS, GENERAL_ERRORS } from './prismaErrors.js';
const prisma = new PrismaClient();
export const connectDBMysql = async () => {
    try {
        await prisma.$connect();
        console.log('Conexión a la base de datos establecida con Prisma.');

        // Crear la base de datos si no existe
        await prisma.$executeRaw`CREATE DATABASE IF NOT EXISTS test;`;
        console.log(`Base de datos creada o verificada.`);
        await prisma.$disconnect();
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
}
