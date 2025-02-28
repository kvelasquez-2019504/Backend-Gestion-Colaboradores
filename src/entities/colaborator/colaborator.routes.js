"use strict";
import {Router } from "express";
import {check } from "express-validator";

import { getColaborators, addColaborator } from "./colaborator.controller.js";

const router = Router();

router.get("/get/colaborador", getColaborators);
router.post("/colaborador",[
    check("NOMBRE", "El nombre es obligatorio, menor o igual a 45 caracteres").not().isEmpty().isLength({max:45}),
    check("APELLIDO", "El apellido es obligatorio, menor o igual a 45 caracteres").not().isEmpty().isLength({max:45}),
    check("DIRECCION", "La direccion tiene que ser menor o igual a 45 caracteres").isLength({max:45}),
    check("EDAD", "La edad es obligatoria y debe ser un numero").not().isEmpty().isNumeric(),
    check("PROFESION", "La profesion es tiene que ser menor o igual a 45 caracteres").isLength({max:45}),
    check("ESTADOCIVIL", "El estado civil tiene que ser menor o igual a 45 caracteres").isLength({max:45}),
] ,addColaborator);

export default router;
