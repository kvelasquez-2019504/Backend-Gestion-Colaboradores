"use strict";
import {Router } from "express";
import {check } from "express-validator";
import { validateFields } from "../../middlewares/validate-fields.js";
import { getColaborators, postColaborator, putColaborator, deleteColaborator } from "./colaborator.controller.js";
import { existsColaborator } from "../../helpers/db-validator.js";

const router = Router();

router.get("/get/colaborador", getColaborators);

router.post("/post/colaborador",[
    check("NOMBRE", "El nombre es obligatorio, menor o igual a 45 caracteres").not().isEmpty().isLength({max:45}),
    check("APELLIDO", "El apellido es obligatorio, menor o igual a 45 caracteres").not().isEmpty().isLength({max:45}),
    check("DIRECCION", "La direccion tiene que ser menor o igual a 45 caracteres").optional().isLength({max:45}),
    check("EDAD", "La edad es obligatoria").isInt({ min: 1, max: 120 }).withMessage("La edad debe estar entre 1 y 120"),
    check("PROFESION", "La profesion es tiene que ser menor o igual a 45 caracteres").optional().isLength({max:45}),
    check("ESTADOCIVIL", "El estado civil tiene que ser menor o igual a 45 caracteres").optional().isLength({max:45}),
    validateFields
], postColaborator);

router.put("/put/colaborador/:idColaborador",[
    check("idColaborador").custom(existsColaborator),
    check("APELLIDO", "El apellido es obligatorio, menor o igual a 45 caracteres").not().isEmpty().isLength({max:45}),
    check("DIRECCION", "La direccion tiene que ser menor o igual a 45 caracteres").optional().isLength({max:45}),
    check("EDAD", "La edad es obligatoria").isInt({ min: 1, max: 120 }).withMessage("La edad debe estar entre 1 y 120"),
    check("PROFESION", "La profesion es tiene que ser menor o igual a 45 caracteres").optional().isLength({max:45}),
    check("ESTADOCIVIL", "El estado civil tiene que ser menor o igual a 45 caracteres").optional().isLength({max:45}),
    validateFields
], putColaborator);

router.delete("/delete/colaborador/:idColaborador",[
    check("idColaborador").custom(existsColaborator),
    validateFields
], deleteColaborator);


export default router;
