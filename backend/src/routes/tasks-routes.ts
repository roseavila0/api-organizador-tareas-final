//El “mapa de rutas”
/*Este archivo le dice a Express:
“Cuando lleguen solicitudes a /, esto es lo que debes hacer dependiendo del método HTTP (GET, POST, etc.) y la URL”.*/

import { Router } from 'express';

// importacion de funciones
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks-controllers';

import { authMiddleware } from '../middlewares/auth-middleware';
import { errorMiddleware } from '../middlewares/error-middleware';
import { validateMiddleware } from '../middlewares/validate-middleware';

/*
 Importaciones importantes:
 Cargas el enrutador de Express
 -Importar las funciones controlador (las que hacen el trabajo real)
 -Importar un middleware de validación para revisar los datos antes de crear una frase */

// crando la instancia del router (para manejar las rutas) // Este router es como una mini-app de Express solo para manejar /api/tasks.
const router: Router = Router();

// Rutas y lógica conectada:
router.get('/', getAllTasks); // Si alguien hace GET /api/tasks→ Ejecuta la función getAllTasks
router.post('/', validateMiddleware, createTask); // Si alguien hace POST /api/tasks con un body → Primero revisa con validateTask si el contenido es válido → Luego ejecuta createTask
router.patch('/:id', updateTask); //Si alguien hace PATCH /api/tasks/7 con cambios → Ejecuta updateTasks con el ID 7
router.delete('/:id', deleteTask); // Si alguien hace DELETE /api/task/3 → Ejecuta deleteTask con el ID 3

export default router;
