// Mapa de rutas para /api/auth
/*
 Este archivo define las rutas relacionadas con la autenticación y gestión de usuarios.
*/


import { Router } from 'express';


// Importación de funciones controlador
import { login, getUsers } from '../controllers/auth-controllers';
import { validateMiddleware } from '../middlewares/validate-middleware';


// Crear una instancia del router
const router: Router = Router();


// POST /api/auth/login → Iniciar sesión (retorna un token si las credenciales son correctas)
router.post('/login', login);
// GET /api/auth/users → Obtener la lista de usuarios (útil para pruebas o administración)
router.get('/users', getUsers);

export default router;
