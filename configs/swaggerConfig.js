import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gestión de Colaboradores",
            version: "1.0.0",
            description: "Documentación de la API para la gestión de colaboradores.",
        },
        servers: [
            {
                url: "http://localhost:8000/",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            responses: {
                UnauthorizedError: {
                    description: "Acceso no autorizado",
                },
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ],
    },
    apis:['./src/entities/colaborator/*.js']
};


export const swaggerSpec = swaggerJSDoc(options);
