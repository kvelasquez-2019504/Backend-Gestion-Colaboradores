"use strict";
export const PRISMA_ERRORS = {
    NOT_FOUND: {
        CODE: 'P2025',
        MESSAGE: 'Registro no encontrado',
    },
    UNIQUE_VIOLATION: {
        CODE: 'P2002',
        MESSAGE: 'El registro ya existe',
    },
    FOREIGN_KEY_VIOLATION: {
        CODE: 'P2003',
        MESSAGE: 'Error en la clave foránea',
    },
    PRIMARY_KEY_VIOLATION: {
        CODE: 'P2004',
        MESSAGE: 'Violación de clave primaria',
    },
    INCORRECT_DATA_TYPE: {
        CODE: 'P2005',
        MESSAGE: 'Tipo de dato incorrecto',
    },
    RELATION_UPDATE_ERROR: {
        CODE: 'P2016',
        MESSAGE: 'Error al actualizar la relación',
    },
    RELATED_RECORD_NOT_FOUND: {
        CODE: 'P2001',
        MESSAGE: 'No se encontró el registro relacionado',
    },
    INVALID_FILTER: {
        CODE: 'P2021',
        MESSAGE: 'Filtro no válido en la consulta',
    },
};

export const GENERAL_ERRORS = {
    INTERNAL_SERVER_ERROR: 'Error interno del servidor',
    NOT_FOUND: 'Recurso no encontrado',
    BAD_REQUEST: 'Solicitud incorrecta',
    UNAUTHORIZED: 'No autorizado',
    FORBIDDEN: 'Prohibido',
    CONFLICT: 'Conflicto',
    UNPROCESSABLE_ENTITY: 'Entidad no procesable',
    TOO_MANY_REQUESTS: 'Demasiadas solicitudes',
    SERVICE_UNAVAILABLE: 'Servicio no disponible',
    GATEWAY_TIMEOUT: 'Tiempo de espera agotado',
    NETWORK_ERROR: 'Error de red',
    UNKNOWN_ERROR: 'Error desconocido',
    SERVER_ERROR: 'Error del servidor',
  };
  