//El “mapa de rutas”
/*Este archivo le dice a Express:
“Cuando lleguen solicitudes a /api/tasks, esto es lo que debes hacer dependiendo del método HTTP (GET, POST, etc.) y la URL”.*/

import { Router } from 'express';

// Importación de funciones controlador (las que manejan la lógica de negocio)
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks-controllers';


// Importación de middlewares
import { authMiddleware } from '../middlewares/auth-middleware';
import { errorMiddleware } from '../middlewares/error-middleware';
import { validateMiddleware } from '../middlewares/validate-middleware';

/*
Estructura del archivo:
- Carga el enrutador de Express
- Importa los controladores de tareas
- Importa middlewares para autenticación, validación y errores
*/

// Creación de una instancia del router (una mini-app de Express para manejar solo las rutas de tareas)
const router: Router = Router();

// Rutas y lógica conectada:
router.get('/', getAllTasks);  // GET /api/tasks → Devuelve todas las tareas
router.post('/', validateMiddleware, createTask); // POST /api/tasks → Valida los datos y luego crea una nueva tarea
router.patch('/:id', updateTask); // PATCH /api/tasks/:id → Actualiza una tarea existente por ID
router.delete('/:id', deleteTask); // DELETE /api/tasks/:id → Elimina una tarea por ID

export default router;