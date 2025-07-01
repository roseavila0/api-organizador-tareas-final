"use strict";
//El “mapa de rutas”
/*Este archivo le dice a Express:
“Cuando lleguen solicitudes a /api/tasks, esto es lo que debes hacer dependiendo del método HTTP (GET, POST, etc.) y la URL”.*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Importación de funciones controlador (las que manejan la lógica de negocio)
const tasks_controllers_1 = require("../controllers/tasks-controllers");
const validate_middleware_1 = require("../middlewares/validate-middleware");
/*
Estructura del archivo:
- Carga el enrutador de Express
- Importa los controladores de tareas
- Importa middlewares para autenticación, validación y errores
*/
// Creación de una instancia del router (una mini-app de Express para manejar solo las rutas de tareas)
const router = (0, express_1.Router)();
// Rutas y lógica conectada:
router.get('/', tasks_controllers_1.getAllTasks); // GET /api/tasks → Devuelve todas las tareas
router.post('/', validate_middleware_1.validateMiddleware, tasks_controllers_1.createTask); // POST /api/tasks → Valida los datos y luego crea una nueva tarea
router.patch('/:id', tasks_controllers_1.updateTask); // PATCH /api/tasks/:id → Actualiza una tarea existente por ID
router.delete('/:id', tasks_controllers_1.deleteTask); // DELETE /api/tasks/:id → Elimina una tarea por ID
exports.default = router;
