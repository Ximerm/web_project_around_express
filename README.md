# Tripleten web_project_around_express

🗂️ Around the U.S. – Back-End API
Este repositorio contiene el back-end de la aplicación Around the U.S., una API REST desarrollada con Node.js y Express. Su función principal es gestionar los datos de usuarios y tarjetas, actuando como capa de comunicación entre el cliente y los recursos almacenados en el servidor.

🧰 Tecnologías utilizadas
Node.js – Entorno de ejecución para JavaScript del lado del servidor
Express.js – Framework minimalista y flexible para crear servidores HTTP
File System (fs) – Lectura y manipulación de archivos JSON
ESLint – Linter para mantener la calidad y consistencia del código
EditorConfig – Configuración compartida para estilo de código
Nodemon – Recarga automática del servidor durante el desarrollo

📁 Estructura del proyecto
/
├── data/ # Archivos JSON que simulan una base de datos
├── routes/ # Definición de rutas para usuarios y tarjetas
├── app.js # Archivo principal de la aplicación Express
├── package.json # Metadatos del proyecto y scripts

📡 Endpoints de la API
Método Ruta Descripción
GET /users Devuelve todos los usuarios
GET /users/:id Devuelve un usuario por su \_id
GET /cards Devuelve todas las tarjetas

📘 Códigos de respuesta
200 OK – Solicitud exitosa
404 Not Found – Recurso no encontrado
500 Internal Server Error – Error interno del servidor

🧪 Requisitos
Node.js versión ^18.x o superior
npm versión ^9.x o superior
