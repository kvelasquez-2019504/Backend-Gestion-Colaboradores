"use strict";
import { PrismaClient } from "@prisma/client";
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
