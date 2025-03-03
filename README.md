# Backend-Gestion-Colaboradores
## Documentación del Proyecto

Este proyecto es una prueba técnica para la gestión de colaboradores.

## Configuraciones Iniciales

1. Clona el repositorio:
    ```bash
    git clone https://github.com/kvelasquez-2019504/Backend-Gestion-Colaboradores.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd Backend-Gestion-Colaboradores
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Configuración del archivo .env

El archivo `.env` contiene las variables de entorno necesarias para configurar la aplicación. A continuación se describen las variables que deben estar presentes en el archivo `.env`:

```properties
PORT=8000
# Puerto en el que se ejecutará el servidor.

DATABASE_URL="mysql://USER:PASSWORD@HOST:PUERTO/DATABASE"
# URL de conexión a la base de datos MySQL.

DATABASE_NAME=""
# Nombre de la base de datos.

DATABASE_HOST=""
# Host de la base de datos.

DATABASE_USER=""
# Usuario de la base de datos.

DATABASE_PASSWORD=""
# Contraseña del usuario de la base de datos.

DATABASE_PORT=0000
# Puerto de la base de datos.

SECRET_KEY_JWT=example
# Clave secreta para la generación de tokens JWT.
```
## Comandos

- Iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```
- Ejecutar el servidor en producción:
    ```bash
    npm start
    ```


# Estructura del proyecto Gestion
```bash
Backend-Gestion-Colaboradores/
├──configs/                        # Configuraciones del servidor  
│  ├──connectionDB.js                # Lógica de configuración de la Base de Datos
│  ├──prismaErrors.js                # Lógica de errores comunes en prisma y backend
│  ├──server.js                      # Servidor principal de la aplicación
│  └──swaggerConfig.js               # Configuraciones de SwaggerUI para los endpoints
├──prisma/                         # Directorio del schema principal de prisma
│  └──schema.prisma.js               # Configuración para la migración de Base de Datos con Prisma
├──src/
│    ├── entities/                  # Directorio que aloja las entidades de la base de datos
│    │   └── colaborator/              # Directorio encargado de la entidad Colaborador
│    │       └── colaborator.controller.js  # Lógica encargada de la entidad Colaborador
│    │       └── colaborator.routes.js      # Rutas de Colaborador
│    ├── middlewares/
│    │   └── validate-jwt.js         # Middleware para validar JWT
│    │   └── validate-fields.js      # Middleware para validar datos
│    │   └── limit-petitions.js      # Middleware para limitar las peticiones
│    └── helpers/
│        └── generate-jwt.js       # Generador de token JWT
│        └── db-validator.js       # Lógica que valida información de la Base de datos
├──.env                         # Archivo para las variables de entorno del proyecto
├──.gitignore                   # Archivo para la gestión de archivos del repositorio
├──index.js                     # Lógica principal para ejecutar el Servidor.
├──LICENSE                      # Licencia de distribución del proyecto
├──package.json                 # Archivo de configuración y dependencias necesarias para ejecutar el proyecto.
└──README.md                    # Archivo de documentación general del proyecto e instrucciones de configuración.
```
## Documentación de los Endpoints de la Aplicación
Este proyecto cuenta con documentación gráfica implementando Swagger.
<ul>
    <li>Si configuro un puerto en especifico ingrese a *http://localhost:PORT/documentation*    </li>
    <li>Si no configuró un puerto en específico ingrese a *http://localhost:8000/documentation* [localhost:8000](http://localhost:8000/documentation)  </li>
</ul> 


