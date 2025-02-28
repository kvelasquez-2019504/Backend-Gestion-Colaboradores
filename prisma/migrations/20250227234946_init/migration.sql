/*
  Warnings:

  - Made the column `NOMBRE` on table `colaborador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `APELLIDO` on table `colaborador` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `colaborador` MODIFY `NOMBRE` VARCHAR(45) NOT NULL,
    MODIFY `APELLIDO` VARCHAR(45) NOT NULL,
    MODIFY `DIRECCION` VARCHAR(45) NULL,
    MODIFY `EDAD` INTEGER NULL,
    MODIFY `PROFESION` VARCHAR(45) NULL,
    MODIFY `ESTADOCIVIL` VARCHAR(45) NULL;
