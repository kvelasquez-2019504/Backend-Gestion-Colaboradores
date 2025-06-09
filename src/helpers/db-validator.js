"use strict";
import { PrismaClient } from "@prisma/client";
import  {Colaborator}  from "../entities/colaborator/colaborator.model.js";
const prisma = new PrismaClient();

export const existsColaborator = async (idColaborador = "") => {
  const colaborator = await prisma.colaborador.findUnique({
    where: {
      IDCOLABORADOR: parseInt(idColaborador),
    }
  });
  if(!colaborator){
    throw new Error(`El colaborador con IDCOLABORADOR: ${idColaborador}, no existe en la base de datos`);
  }
};

export const existsColaboratorNoSQL = async (idColaborador = "") => {
  const colaborator = await Colaborator.findOne({ IDCOLABORADOR: parseInt(idColaborador) });
  if (!colaborator) {
    throw new Error(`El colaborador con IDCOLABORADOR: ${idColaborador}, no existe en la base de datos`);
  }
};