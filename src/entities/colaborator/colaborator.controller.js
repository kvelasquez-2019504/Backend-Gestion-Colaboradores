'use strict';
import { PrismaClient } from "@prisma/client";
import { generateJWT } from "../../helpers/generate-jwt.js";
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
                take: parseInt(pageSize),
                orderBy: {
                    IDCOLABORADOR: "desc"
                }
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

export const getColaboartorById = async (req = Request, res = Response) => {
    try {
        const { idColaborador} = req.params;
        const colaborator= await prisma.colaborador.findUnique({
            where: { IDCOLABORADOR: parseInt(idColaborador) }
        })
        res.status(200).json({
            msg: `Se ha encontrado el colaborador`,
            colaborator            
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

export const loginColaborator = async (req = Request, res = Response) => {
    try {
        const { IDCOLABORADOR, EDAD } = req.body;
        const colaborator = await prisma.colaborador.findUnique({
            where: { IDCOLABORADOR: parseInt(IDCOLABORADOR), EDAD: parseInt(EDAD) }
        })

        if(!colaborator){
            return res.status(401).json({msg: "El colaborador no existe o la edad es incorrecta. Intenta de nuevo"}); 
        }

        const token = await generateJWT(IDCOLABORADOR);
        res.status(200).json({
            msg:"Login correcto",
            token
        });
    }catch(error){
        console.log(error);
    }
}