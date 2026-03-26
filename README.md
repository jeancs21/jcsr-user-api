# User Management API

Esta es una API REST desarrollada con Node.js y Express para la gestión de usuarios. El proyecto utiliza un sistema de persistencia basado en un archivo JSON local y cuenta con validaciones robustas y configuración de seguridad básica.

## Características y Solución Aplicada

Para cumplir con los requerimientos del proyecto, se implementaron las siguientes soluciones:

1.  **Validación de Datos:** Se integró la librería `yup` para validar los datos de los usuarios al momento de la creación (`POST /api/users`). El esquema asegura que:
    *   El nombre sea obligatorio y tenga al menos 3 caracteres.
    *   El correo sea obligatorio y tenga un formato válido.
    *   El teléfono sea obligatorio, contenga solo números y tenga un máximo de 15 caracteres.
    *   La empresa y la ciudad sean campos obligatorios.
2.  **Arquitectura Limpia:** Se organizó el proyecto siguiendo el patrón de diseño sugerido:
    *   **Routes:** Definición de los puntos de entrada.
    *   **Controllers:** Manejo de la lógica de peticiones y respuestas.
    *   **Services:** Lógica de negocio y manipulación de datos.
    *   **Middlewares:** Validaciones y configuración de CORS centralizada.
3.  **Seguridad (CORS):** Se habilitó un middleware de CORS personalizado para controlar los dominios que pueden consumir la API.
4.  **Prefijo Global:** Todas las rutas están bajo el prefijo `/api` para seguir los estándares de desarrollo de APIs.

## Tecnologías Utilizadas

*   **Node.js** (Entorno de ejecución)
*   **Express** (Framework web)
*   **Yup** (Validación de esquemas)
*   **CORS** (Seguridad en peticiones cruzadas)
*   **Nodemon** (Entorno de desarrollo)

## Instalación y Uso

Requisitos previos:
- Node.js (versión 16.x o superior)
- npm o pnpm.

Sigue estos pasos para poner en marcha la API localmente:

1.  **Clonar el proyecto:**
    ```bash
    git clone https://github.com/jeancs21/jcsr-user-api.git
    cd jcsr-user-api
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor:**
    *   Para desarrollo (con recarga automática):
        ```bash
        npm run dev
        ```

El servidor estará corriendo en: `http://localhost:3000`

## Endpoints Principales

*   `GET /api/users`: obtener todos los usuarios (admite filtros por `search`, `city` y `company`).
*   `GET /api/users/:id`: obtener un usuario específico por su ID.
*   `POST /api/users`: crear un nuevo usuario (requiere validación de esquema).
*   `PATCH /api/users:id`: editar los datos de un usuario seleccionado (requiere validación de esquema).
*   `DELETE /api/users:id`: borrar completamente un usuario seleccionado.

---

## IMPORTANTE
Alternativamente a postman, el API también puede ser consumido por medio de un aplicativo web frontend creado especificamente para este API el cual cuenta con interfaces y filtros para poder realizar operaciones CRUD de los usuarios.
### Aplicación frontend
https://github.com/jeancs21/jcsr-fe-user-explorer

## Recomendaciones para el Futuro

Para escalar esta solución y mejorar la integridad del sistema, se proponen las siguientes mejoras:

1.  **Gestión de Ubicaciones (Ciudades y Países):**
    *   Implementar endpoints específicos para la gestión de ciudades.
    *   Asociar cada ciudad a un país para tener un control jerárquico de los datos.
    *   Esto permitiría alimentar selectores en el frontend de forma dinámica o incluso integrar APIs externas de geolocalización.

2.  **Autenticación y Autorización (RBAC):**
    *   Implementar un sistema de autenticación (ej. JWT).
    *   Establecer roles de usuario, priorizando la creación de un rol **Admin**.
    *   Restringir las operaciones sensibles (crear, editar, borrar) solo a usuarios con privilegios administrativos para asegurar la integridad de la información y reducir el margen de error humano.
