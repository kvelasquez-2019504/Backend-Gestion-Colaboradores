-- CreateTable
CREATE TABLE `Colaborador` (
    `IDCOLABORADOR` INTEGER NOT NULL AUTO_INCREMENT,
    `NOMBRE` VARCHAR(191) NOT NULL,
    `APELLIDO` VARCHAR(191) NOT NULL,
    `DIRECCION` VARCHAR(191) NOT NULL,
    `EDAD` INTEGER NOT NULL,
    `PROFESION` VARCHAR(191) NOT NULL,
    `ESTADOCIVIL` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`IDCOLABORADOR`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
