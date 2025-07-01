# API Organizador de Tareas

## Descripción

Este proyecto es un organizador de tareas con backend en Node.js + Express (TypeScript) y frontend en HTML, CSS y JavaScript.  

Permite a los usuarios:
- Iniciar sesión con autenticación mediante **JWT**.
- Crear, listar, actualizar y eliminar tareas.
- Acceder a una interfaz web simple y funcional.

---

## Estructura del Proyecto

- `/backend/src` → Código fuente del backend (API RESTful en TypeScript).
-   `dist ` → carpeta que contiene todo el materiial de backend pero en formato js, sirve mas para la parte de deployar.
- `/client` → Archivos estáticos del frontend (HTML, CSS, JS).
- `.env` → Variables de entorno (como el JWT_SECRET o el puerto).
- `.gitignore` → Evita subir `node_modules`, `.env`, etc.
- `.prettierrc` → Configuración para formateo de código del frontend.
- `README.md` → Este archivo
---

### Desarrollo local

Cuando haya clonado el proyecto en su computador, use npm install para instalar las dependencias necesarias.

Levanta el servidor: "npm run dev"
Posterior puedes hacer pruebas en postman con las siguientes rutas y métodos:



-link de la colección de postman:
 https://web.postman.co/workspace/My-Workspace~0145ab66-233b-4c70-8e31-cbf704963d8e/folder/45068560-5ef8c17a-9526-4c01-8781-e642d5b4de40?action=share&source=copy-link&creator=45068560&ctx=documentation


-Usar este usuario para probar (es uno de los que se encuentran en el json de usarios)
{
  "email": "admin@test.com",
  "password": "123456"
}


POST login     (con tu usuario y contraseña):                                                                  POST http://localhost:3000/api/auth/login
GET  Users     Obtener usuarios (te da una lista de los usuarios registrados con su contraseñas):              GET http://localhost:3000/api/auth/users 
GET  tasks     Devuelve todas las tareas                                                                       GET http://localhost:3000/api/tasks
POST task      Valida los datos y luego crea una nueva tarea (seguir el formato de las tareas ya registradas)  POST http://localhost:3000/api/tasks
PATCH tasks    Actualiza una tarea existente por ID                                                            PATCH http://localhost:3000/api/tasks/(ingrese el id de la     tarea que quiera actualizar)
DELETE task    Elimina una tarea por ID                                                                        DELETE http://localhost:3000/api/tasks/(ingrese el id que quiera eliminar)




---------------------------------------------------------------------------------------------


Deploy en Render
Para desplegar el backend en Render.com:

1.Subir el proyecto a GitHub

2.Crear un nuevo Web Service en Render (Node.js)

3.Configurar lo siguiente:

Comando de Build:
npm install && npm run build


Comando de Inicio:
node backend/dist/index.js




