-- AlterTable
ALTER TABLE `colaborador` MODIFY `NOMBRE` VARCHAR(45) NULL,
    MODIFY `APELLIDO` VARCHAR(45) NULL,
    ALTER COLUMN `EDAD` DROP DEFAULT;
