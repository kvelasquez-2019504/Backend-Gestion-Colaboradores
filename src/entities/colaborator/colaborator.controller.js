'use strict';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addColaborator = async (req = Request, res = Response) => {
   try {
    const { NOMBRE, APELLIDO, DIRECCION, PROFESION, ESTADOCIVIL } = req.body;
    let { EDAD } = req.body;
    EDAD = parseInt(EDAD);
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

    res.status(200).json({
        msg: "Se ha añadido un colaborador",
        colaborator
      });
   } catch (error) {
    console.log(error)
   }
}

export const getColaborators = async (req = Request, res = Response) => {
    try {
        const colaborators = await prisma.colaborador.findMany();
        res.status(200).json({
            msg: `Se han obtenido los colaboradores`,
            colaborators
          });
    } catch (error) {
        console.log(error);
    }
}