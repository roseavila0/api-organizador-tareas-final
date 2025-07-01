"use strict";
// Mapa de rutas para /api/auth
/*
 Este archivo define las rutas relacionadas con la autenticación y gestión de usuarios.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Importación de funciones controlador
const auth_controllers_1 = require("../controllers/auth-controllers");
// Crear una instancia del router
const router = (0, express_1.Router)();
// POST /api/auth/login → Iniciar sesión (retorna un token si las credenciales son correctas)
router.post('/login', auth_controllers_1.login);
// GET /api/auth/users → Obtener la lista de usuarios (útil para pruebas o administración)
router.get('/users', auth_controllers_1.getUsers);
exports.default = router;
