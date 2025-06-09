import { Colaborator } from "./colaborator.model.js";
import { generateJWT } from "../../helpers/generate-jwt.js";

export const loginColaborator = async (req = Request, res = Response) => {
    try {
        const { IDCOLABORADOR, EDAD } = req.body;
        const colaborator = await Colaborator.findOne({
            IDCOLABORADOR: parseInt(IDCOLABORADOR),
            EDAD: parseInt(EDAD)
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
        console.error("Error al iniciar sesión: " + error);
        res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });  
    }
}

export const postColaborator = async (req = Request, res = Response) => {
    try {
        const { NOMBRE, APELLIDO, DIRECCION, PROFESION, ESTADOCIVIL } = req.body;
        let { EDAD } = req.body;
        EDAD = parseInt(EDAD);
        const colators= await Colaborator.countDocuments();
        const colaborator = new Colaborator({
            IDCOLABORADOR: colators + 1, // Genera un ID aleatorio
            NOMBRE,
            APELLIDO,
            DIRECCION,
            EDAD,
            PROFESION,
            ESTADOCIVIL
        });
        await colaborator.save();

        res.status(200).json({
            msg: "Se ha agregado un colaborador",
            colaborator
        });
    } catch (error) {
        console.error("Error al agregar colaborador: " + error);
        res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
    }
}

export const getColaborators = async (req = Request, res = Response) => {
    try {
        const { pageSize = 10, page = 1 } = req.query;
        const skip = (page - 1) * pageSize;

        const [colaborators, totalColaborators] = await Promise.all([
            Colaborator.find()
                .skip(skip).limit(parseInt(pageSize))
                .sort({ IDCOLABORADOR: -1 }),
            Colaborator.countDocuments()
        ]);

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
        console.error("Error al obtener los colaboradores: "+error);
        res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
    }
}

export const getColaboartorById = async (req = Request, res = Response) => {
    try {
        const { idColaborador } = req.params;
        const colaborator = await Colaborator.findOne({
            IDCOLABORADOR: parseInt(idColaborador)
        })
        res.status(200).json({
            msg: `Se ha encontrado el colaborador`,
            colaborator
        });
    } catch (error) {
        console.error("Error al obtener el colaborador por ID: " + error);
        res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
    }
}

export const putColaborator = async (req = Request, res = Response) => {
    try {
        const { NOMBRE, APELLIDO, DIRECCION, PROFESION, ESTADOCIVIL } = req.body;
        let { EDAD } = req.body;
        EDAD = parseInt(EDAD);
        const { idColaborador } = req.params;

        const colaboratorUpdate = await Colaborator.findOneAndUpdate(
            { IDCOLABORADOR: parseInt(idColaborador) },
            {
                NOMBRE,
                APELLIDO,
                DIRECCION,
                EDAD,
                PROFESION,
                ESTADOCIVIL
            }
        );

        res.status(200).json({
            msg: "Se ha actualizado el colaborador",
            colaboratorUpdate,
        });
    } catch (error) {
        console.error("Error al actualizar el colaborador: " + error);
        res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
    }
}
export const deleteColaborator = async (req = Request, res = Response) => {
    try {
        const { idColaborador } = req.params;
        const colaboratorDelete = await Colaborator.findOneAndDelete({
            IDCOLABORADOR: idColaborador
        })
        res.status(200).json({
            msg: "Se ha eliminado el colaborador",
            colaboratorDelete
        });
    } catch (error) {
        console.error("Error al eliminar el colaborador: " + error);
        res.status(500).json({ msg: "Error en el servidor, contacte con el administrador." });
    }
}