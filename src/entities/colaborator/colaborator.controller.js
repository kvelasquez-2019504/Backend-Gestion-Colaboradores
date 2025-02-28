'use strict';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const postColaborator = async (req = Request, res = Response) => {
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
        const { pageSize = 10, page = 1} = req.query;
        const skip = (page - 1) * pageSize;
        const [colaborators, totalColaborators] = await prisma.$transaction([
            prisma.colaborador.findMany({
                skip,
                take: parseInt(pageSize)
            }),
            prisma.colaborador.count()
        ])
        const totalPages = Math.ceil(totalColaborators / pageSize);
        res.status(200).json({
            msg: `Se han obtenido los colaboradores`,
            colaborators,
            pageSize,
            page,
            totalColaborators,
            totalPages
        });
    } catch (error) {
        console.log(error);
    }
}

export const putColaborator = async (req = Request, res = Response) => {
    try {
        const { NOMBRE, APELLIDO, DIRECCION, PROFESION, ESTADOCIVIL } = req.body;
        let { EDAD } = req.body;
        EDAD = parseInt(EDAD);
        const { idColaborador } = req.params;
        const colaboratorFind = await prisma.colaborador.findUnique({
            where: { IDCOLABORADOR: parseInt(idColaborador) }
        })
        const colaboratorUpdate = await prisma.colaborador.update({
            where: { IDCOLABORADOR: parseInt(idColaborador) },
            data: {
                NOMBRE,
                APELLIDO,
                DIRECCION,
                EDAD,
                PROFESION,
                ESTADOCIVIL
            }
        })

        res.status(200).json({
            msg: "Se ha actualizado el colaborador",
            find: "Colaborador encontrado",
            colaboratorFind,
            update: "Colaborador actualizado",
            colaboratorUpdate,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteColaborator = async (req = Request, res = Response) => {
    try {
        const { idColaborador } = req.params;
        const colaboratorDelete = await prisma.colaborador.delete({
            where: { IDCOLABORADOR: parseInt(idColaborador) }
        })
        res.status(200).json({
            msg: "Se ha eliminado el colaborador",
            colaboratorDelete
        });
    } catch (error) {
        console.log(error);
    }
}