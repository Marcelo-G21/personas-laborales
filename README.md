# Personas Laborales

**Personas Laborales** es una aplicación diseñada para gestionar personas y sus respectivos trabajos. Permite a los usuarios crear, leer, actualizar y eliminar personas, así como administrar los trabajos asociados a cada persona. Ideal para aplicaciones que requieren seguimiento de empleados o gestión de personal.

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Rutas de la API](#rutas-de-la-api)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)
5. [Instalación](#instalación)
6. [Uso](#uso)
7. [Contribución](#contribución)

## Descripción del Proyecto

**Personas Laborales** es una solución integral para la gestión de personal que ofrece las siguientes funcionalidades:

- **Crear**: Agregar nuevas personas y sus trabajos asociados.
- **Leer**: Consultar información sobre personas y sus trabajos.
- **Actualizar**: Modificar datos de personas y de los trabajos asociados.
- **Eliminar**: Borrar personas y sus trabajos del sistema.

La aplicación utiliza un enfoque modular con Express y Sequelize, facilitando el mantenimiento y la expansión de sus características.

## Estructura del Proyecto

- `/config`: Contiene los archivos de configuración (e.g., configuración de Redis).
- `/controllers`: Contiene la lógica para manejar las solicitudes HTTP.
- `/database`: Contiene la configuración y conexiones de base de datos.
- `/middlewares`: Contiene las validaciones de datos.
- `/migrations`: Archivos de migración para la base de datos.
- `/models`: Contiene los modelos de la base de datos.
- `/routes`: Contiene las definiciones de rutas de la API.
- `/seeders`: Datos de prueba para la base de datos.
- `/services`: Contiene la lógica de negocio y comunicación con la base de datos.
- `/src`
  - `/pages`: Archivos HTML para las vistas.
  - `/scripts`: Archivos JavaScript para funcionalidad en el cliente.
  - `/styles`: Archivos CSS para estilos.
- `app.js`: Conexión con redis y configuración de Express.
- `index.js`: Punto de entrada principal del servidor.
- `.prettierrc`: Configuración de Prettier.

## Rutas de la API

- `GET /api/people`: Listar todas las personas.
- `GET /api/people/:personId`: Obtener una persona específica por ID.
- `POST /api/people`: Crear una nueva persona.
- `PUT /api/people/:personId`: Actualizar una persona existente.
- `DELETE /api/people/:personId`: Eliminar una persona.

Rutas no implementadas en la vista, pero disponibles desde la API:

- `PUT /api/people/:personId/jobs/:jobId`: Actualizar un trabajo específico.
- `DELETE /api/people/:personId/jobs/:jobId`: Eliminar un trabajo específico.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para Node.js que facilita la creación de aplicaciones web.
- **Sequelize**: ORM para Node.js que soporta PostgreSQL.
- **Redis**: Sistema de almacenamiento en caché.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.

## Instalación

Para configurar el proyecto en tu máquina local, sigue estos pasos:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/Marcelo-G21/personas-laborales.git
   cd personas-laborales
   ```

2. **Instala las dependencias usando Yarn:**

   ```bash
   yarn install
   ```

3. **Configura el entorno:**

   Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno necesarias. Ejemplo de archivo `.env`:

   ```
   DB_DATABASE='your-database-name'
   DB_USERNAME='your-postgres-username'
   DB_PASSWORD='your-password'
   DB_HOST='localhost'
   DB_DIALECT='postgres'
   REDIS_URL='redis://localhost:6379'
   PORT=3000
   ```

4. **Ejecuta tu servidor de Redis**

  Puedes ejecutar una imagen de Redis con Docker y en su consola ejecuta el siguiente comando:

   ```bash
   redis-cli -h 127.0.0.1 -p 6379
   ```

5. **Ejecuta las migraciones (si es necesario):**

   ```bash
   yarn sequelize-cle bd:migrate
   ```

   En caso de querer deshacer una migración:

   ```bash
   yarn sequelize-cli db:migrate:undo
   ```

6. **Ejecuta seeders**

   ```bash
   yarn sequelize-cli db:seed:all
   ```

   En caso de querer deshacer el seeder:

   ```bash
   yarn sequelize-cli db:seed:undo
   ```

7. **Inicia el servidor:**

   ```bash
   yarn dev
   ```

## Uso

Una vez el servidor esté inicializado:

1. Abre tu navegador y ve a http://localhost:3000 para cargar la página principal (index.html).

2. En la página principal, verás los siguientes botones que te llevarán a sus respectivas funcionalidades:

-**Ver Personas**: Dirige a una página donde se listan todas las personas. -**Consultar Persona**: Permite consultar los detalles de una persona específica por su ID.
-**Agregar Persona**: Redirige a un formulario para agregar una nueva persona y sus trabajos asociados.
-**Editar Persona**: Permite seleccionar una persona y editar sus datos y trabajos asociados.
-**Eliminar Persona**: Dirige a la opción para eliminar una persona específica y sus trabajos asociados.

A partir de estas acciones, podrás interactuar con las diferentes funcionalidades de la aplicación, incluyendo ver, agregar, actualizar y eliminar personas y trabajos.

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para sugerir mejoras o corregir errores.
