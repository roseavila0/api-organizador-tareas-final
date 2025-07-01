"use strict";
//  auth-controllers.ts
// Controladores para manejar el login y la obtención de usuarios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_models_1 = require("../models/users-models");
//  Login de usuario y generación de token
const login = (req, res) => {
    const { email, password } = req.body;
    // Validación básica de campos requeridos
    if (!email || !password) {
        res.status(400).json({
            error: 'Email y contraseña son requeridos',
            success: false,
        });
        return;
    }
    // Validar credenciales contra la "base de datos"
    const user = users_models_1.usersModel.validateUser(email, password);
    if (!user) {
        res.status(401).json({
            error: 'Credenciales incorrectas',
            success: false,
        });
        return;
    }
    // Generar JWT token
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    // Respuesta exitosa con token y datos del usuario
    res.status(200).json({
        success: true,
        message: 'Login exitoso',
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
    });
};
exports.login = login;
//  Obtener todos los usuarios (sin contraseñas)
const getUsers = (req, res) => {
    const users = users_models_1.usersModel.getAllUsers();
    res.json(users);
};
exports.getUsers = getUsers;
