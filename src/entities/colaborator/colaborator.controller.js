'use strict';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addColaborator = async (req = Request, res = Response) => {
    const { NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL } = req.body;

    const colaborator = await prisma.colaborador.create({
        data: {
            NOMBRE,
            APELLIDO,
            DIRECCION,
            EDAD,
            PROFESION,
            ESTADOCIVIL
        }
    });

    res.json(colaborator);
}

export const getColaborators = async (req = Request, res = Response) => {
    try {
        const colaborators = await prisma.colaborador.findMany();
        res.status(200).json({
            msg: `HOla`,
          });
    } catch (error) {
        console.log(error);
    }
}