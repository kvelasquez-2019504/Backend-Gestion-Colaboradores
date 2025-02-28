/*
  Warnings:

  - You are about to alter the column `NOMBRE` on the `colaborador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `APELLIDO` on the `colaborador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `DIRECCION` on the `colaborador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `PROFESION` on the `colaborador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `ESTADOCIVIL` on the `colaborador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.

*/
-- AlterTable
ALTER TABLE `colaborador` MODIFY `NOMBRE` VARCHAR(45) NOT NULL,
    MODIFY `APELLIDO` VARCHAR(45) NOT NULL,
    MODIFY `DIRECCION` VARCHAR(45) NOT NULL,
    MODIFY `PROFESION` VARCHAR(45) NOT NULL,
    MODIFY `ESTADOCIVIL` VARCHAR(45) NOT NULL;
