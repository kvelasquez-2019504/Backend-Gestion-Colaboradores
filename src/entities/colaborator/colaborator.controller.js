'use strict';
import { PrismaClient } from "@prisma/client";
import { generateJWT } from "../../helpers/generate-jwt.js";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { connectDBMysql } from "../../../configs/connectionDB.js";
const prisma = new PrismaClient();

/**
 * @swagger
 * /login:
 *   post:
 *     description: Inicio de sesion para cualquier usuario registrado en la base de datos y la edad del colaborador, funciona como su contraseña para generar el token.
 *     summary: Inicio de sesion
 *     security: []
 *     tags: [Colaborador]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IDCOLABORADOR
 *               - EDAD
 *             properties:
 *               IDCOLABORADOR:
 *                 type: integer
 *               EDAD:
 *                 type: integer
 *             example:
 *               IDCOLABORADOR: 2
 *               EDAD: 2
 *     responses:
 *       200:
 *         description: Login correcto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *          description: Errores provenientes de validaciones en los campos requeridos
 *          content:
 *            application/json: 
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "Los campos IDCOLABORADOR y EDAD son requeridos"
 *       401:
 *         description: El colaborador no existe o la edad es incorrecta
 *         content:
 *          application/json: 
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "El colaborador no existe o la edad es incorrecta. Intenta de nuevo"
 *       500:
 *         description: Error en el servidor
 *         content:
 *          application/json: 
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "Error en el servidor, contacte con el administrador."
 */
export const loginColaborator = async (req = Request, res = Response) => {
    try {
        const { IDCOLABORADOR, EDAD } = req.body;
        const colaborator = await prisma.colaborador.findUnique({
            where: { IDCOLABORADOR: parseInt(IDCOLABORADOR), EDAD: parseInt(EDAD) }
        })

        if (!colaborator) {
            return res.status(401).json({ msg: "El colaborador no existe o la edad es incorrecta. Intenta de nuevo" });
        }

        const token = await generateJWT(IDCOLABORADOR);
        res.status(200).json({
            msg: "Login correcto",
            token
        });
    } catch (error) {
        if(error instanceof PrismaClientInitializationError){
            await connectDBMysql();
            console.log("Base de datos verificada/creada.");
            res.status(500).json({ msg: "Error en la base de datos, intente mas tarde o contacte con el administrador." });
        }else{
            res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
        }
    }
}

/**
 * @swagger
 * /post/colaborador:
 *   post:
 *     description: Agrega un colaborador a la base de datos y es necesario el token de inicio de sesion para agregar un colaborador.
 *     summary: Agrega un colaborador a la base de datos
 *     tags: [Colaborador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - NOMBRE
 *               - APELLIDO
 *               - DIRECCION
 *               - EDAD
 *               - PROFESION
 *               - ESTADOCIVIL
 *             properties:
 *               NOMBRE:
 *                 type: string
 *               APELLIDO:
 *                 type: string
 *               DIRECCION:
 *                 type: string
 *               EDAD:
 *                 type: integer
 *               PROFESION:
 *                 type: string
 *               ESTADOCIVIL:
 *                 type: string
 *             example:
 *               NOMBRE: "Pepe"
 *               APELLIDO: "Perez"
 *               DIRECCION: "Calle 1"
 *               EDAD: 20
 *               PROFESION: "Programador"
 *               ESTADOCIVIL: "Soltero"
 *     responses:
 *       200:
 *         description: Se ha agregado un colaborador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 colaborator:
 *                   type: object
 *                   properties:
 *                     IDCOLABORADOR:
 *                       type: integer
 *                     NOMBRE:
 *                       type: string
 *                     APELLIDO:
 *                       type: string
 *                     DIRECCION:
 *                       type: string
 *                     EDAD:
 *                       type: integer
 *                     PROFESION:
 *                       type: string
 *                     ESTADOCIVIL:
 *                       type: string
 *       400:
 *          description: Errores provenientes de validaciones en los campos requeridos
 *          content:
 *            application/json: 
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "Los campos NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION y ESTADOCIVIL son requeridos"
 *       500:
 *         description: Error en el servidor
 *         content:
 *          application/json: 
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "Error en el servidor, contacte con el administrador."
 */
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
            msg: "Se ha agregado un colaborador",
            colaborator
        });
    } catch (error) {
        if(error instanceof PrismaClientInitializationError){
            await connectDBMysql();
            console.log("Base de datos verificada/creada.");
            res.status(500).json({ msg: "Error en la base de datos, intente mas tarde o contacte con el administrador." });
        }else{
            res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
        }
    }
}

/**
 * @swagger
 * /get/colaborador:
 *   get:
 *     description: Obtiene todos los colaboradores de la base de datos y es necesario el token de inicio de sesion para obtener los colaboradores con paginacion; el tamaño de la pagina por defecto es 10 y la pagina por defecto es 1.
 *     summary: Obtiene todos los colaboradores con paginacion
 *     tags: [Colaborador]
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Tamaño de la pagina
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Pagina
 *     responses:
 *       200:
 *         description: Se han obtenido los colaboradores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 colaborators:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       IDCOLABORADOR: 
 *                         type: integer
 *                         example: 1
 *                       NOMBRE:
 *                         type: string
 *                         example: "Pepe"
 *                       APELLIDO:
 *                         type: string
 *                         example: "Perez"
 *                       DIRECCION:
 *                         type: string
 *                         example: "Calle 1"
 *                       EDAD:
 *                         type: integer
 *                         example: 20
 *                       PROFESION:
 *                         type: string
 *                         example: "Programador"
 *                       ESTADOCIVIL:
 *                         type: string
 *                         example: "Soltero"
 *                 pageSize:
 *                   type: integer
 *                   example: 10
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalColaborators:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Error en el servidor
 *         content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "Error en el servidor, contacte con el administrador."
*/
export const getColaborators = async (req = Request, res = Response) => {
    try {
        const { pageSize = 10, page = 1 } = req.query;
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
        if(error instanceof PrismaClientInitializationError){
            await connectDBMysql();
            console.log("Base de datos verificada/creada.");
            res.status(500).json({ msg: "Error en la base de datos, intente mas tarde o contacte con el administrador." });
        }else{
            res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
        }
    }
}

/**
 * @swagger
 * /find/colaborador/{idColaborador}:
 *   get:
 *     description: Busca un colaborador por id y es necesario el token de inicio de sesion para buscar un colaborador.
 *     summary: Busca un colaborador por id
 *     tags: [Colaborador]
 *     parameters:
 *       - in: path
 *         name: idColaborador
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del colaborador a buscar
 *     responses:
 *       200:
 *         description: Se ha encontrado el colaborador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Se ha encontrado el colaborador"
 *                 colaborator:
 *                   type: object
 *                   properties:
 *                     IDCOLABORADOR: 
 *                       type: integer
 *                       example: 1
 *                     NOMBRE:
 *                       type: string
 *                       example: "Pepe"
 *                     APELLIDO:
 *                       type: string
 *                       example: "Perez"
 *                     DIRECCION:
 *                       type: string
 *                       example: "Calle 1"
 *                     EDAD:
 *                       type: integer
 *                       example: 20
 *                     PROFESION:
 *                       type: string
 *                       example: "Programador"
 *                     ESTADOCIVIL:
 *                       type: string
 *                       example: "Soltero"
 *       400:
 *          description: Errores provenientes de validaciones en los campos requeridos
 *          content:
 *            application/json: 
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "El id del colaborador es requerido o el colaborador no existe"
 *       500:
 *         description: Error en el servidor
 *         content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "Error en el servidor, contacte con el administrador."
 */
export const getColaboartorById = async (req = Request, res = Response) => {
    try {
        const { idColaborador } = req.params;
        const colaborator = await prisma.colaborador.findUnique({
            where: { IDCOLABORADOR: parseInt(idColaborador) }
        })
        res.status(200).json({
            msg: `Se ha encontrado el colaborador`,
            colaborator
        });
    } catch (error) {
        if(error instanceof PrismaClientInitializationError){
            await connectDBMysql();
            console.log("Base de datos verificada/creada.");
            res.status(500).json({ msg: "Error en la base de datos, intente mas tarde o contacte con el administrador." });
        }else{
            res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
        }
    }
}

/** 
 * @swagger
 * /put/colaborador/{idColaborador}:
 *   put:
 *     description: Actualiza un colaborador por id y es necesario el token de inicio de sesion para actualizar un colaborador.
 *     summary: Actualiza un colaborador por id
 *     tags: [Colaborador]
 *     parameters:
 *       - in: path
 *         name: idColaborador
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del colaborador a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - NOMBRE
 *               - APELLIDO
 *               - DIRECCION
 *               - EDAD
 *               - PROFESION
 *               - ESTADOCIVIL
 *             properties:
 *               NOMBRE:
 *                 type: string
 *               APELLIDO:
 *                 type: string
 *               DIRECCION:
 *                 type: string
 *               EDAD:
 *                 type: integer
 *               PROFESION:
 *                 type: string
 *               ESTADOCIVIL:
 *                 type: string
 *             example:
 *               NOMBRE: "Pepe"
 *               APELLIDO: "Perez"
 *               DIRECCION: "Calle 1"
 *               EDAD: 20
 *               PROFESION: "Programador"
 *               ESTADOCIVIL: "Soltero"
 *     responses:
 *       200:
 *         description: Se ha actualizado el colaborador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Se ha actualizado el colaborador"
 *                 colaboratorUpdate:
 *                   type: object
 *                   properties:
 *                     IDCOLABORADOR:
 *                       type: integer
 *                       example: 1
 *                     NOMBRE:
 *                       type: string
 *                       example: "Pepe"
 *                     APELLIDO:
 *                       type: string
 *                       example: "Perez"
 *                     DIRECCION:
 *                       type: string
 *                       example: "Calle 1"
 *                     EDAD:
 *                       type: integer
 *                       example: 20
 *                     PROFESION:
 *                       type: string
 *                       example: "Programador"
 *                     ESTADOCIVIL:
 *                       type: string
 *                       example: "Soltero"
 *       400:
 *          description: Errores provenientes de validaciones en los campos requeridos
 *          content:
 *            application/json: 
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "El id del colaborador es requerido o el colaborador no existe, NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL son requeridos"
 *       500:
 *         description: Error en el servidor
 *         content:
 *          application/json: 
 *              schema:
 *                type: object
 *                properties: 
 *                  msg:
 *                    type: string
 *                    example: "Error en el servidor, contacte con el administrador."
*/
export const putColaborator = async (req = Request, res = Response) => {
    try {
        const { NOMBRE, APELLIDO, DIRECCION, PROFESION, ESTADOCIVIL } = req.body;
        let { EDAD } = req.body;
        EDAD = parseInt(EDAD);
        const { idColaborador } = req.params;

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
            colaboratorUpdate,
        });
    } catch (error) {
        if(error instanceof PrismaClientInitializationError){
            await connectDBMysql();
            console.log("Base de datos verificada/creada.");
            res.status(500).json({ msg: "Error en la base de datos, intente mas tarde o contacte con el administrador." });
        }else{
            res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
        }
    }
}

/** 
 * @swagger
 * /delete/colaborador/{idColaborador}:
 *   delete:
 *     description: Elimina un colaborador de la base de datos y es necesario el token de inicio de sesion para eliminar un colaborador.
 *     summary: Elimina un colaborador de la base de datos
 *     tags: [Colaborador]
 *     parameters:
 *       - in: path
 *         name: idColaborador
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del colaborador a eliminar
 *     responses:
 *       200:
 *         description: Se ha eliminado el colaborador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 colaborator:
 *                   type: object
 *                   properties:
 *                     IDCOLABORADOR:
 *                       type: integer
 *                       example: 1
 *                     NOMBRE:
 *                       type: string
 *                       example: "Pepe"
 *                     APELLIDO:
 *                       type: string
 *                       example: "Perez"
 *                     DIRECCION:
 *                       type: string
 *                       example: "Calle 1"
 *                     EDAD:
 *                       type: integer
 *                       example: 20
 *                     PROFESION:
 *                       type: string
 *                       example: "Programador"
 *                     ESTADOCIVIL:
 *                       type: string
 *                       example: "Soltero"
 *       400:
 *          description: Errores provenientes de validaciones en los campos requeridos
 *          content:
 *            application/json: 
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "El id del colaborador es requerido o el colaborador no existe"
 *       500:
 *         description: Error en el servidor
 *         content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: "Error en el servidor, contacte con el administrador."
 */
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
        if(error instanceof PrismaClientInitializationError){
            await connectDBMysql();
            console.log("Base de datos verificada/creada.");
            res.status(500).json({ msg: "Error en la base de datos, intente mas tarde o contacte con el administrador." });
        }else{
            res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
        }
    }
}