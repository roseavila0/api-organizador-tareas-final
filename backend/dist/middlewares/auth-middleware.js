"use strict";
// Middleware de autenticación con JWT
// Este middleware protege rutas restringidas verificando que se envíe un token válido en el header Authorization
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    // Extraer el token del encabezado Authorization (formato: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.substring(7) // Remover 'Bearer ' del inicio
        : null;
    // Si no hay token, bloquear acceso
    if (!token) {
        res.status(401).json({
            error: 'Token de acceso requerido',
            success: false,
        });
        return;
    }
    try {
        // Verificar el token usando la clave secreta del entorno
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded; // Guardar la información del usuario en la petición para usarla más adelante
        next(); // Continuar con la siguiente función
    }
    catch (error) {
        // Si el token es inválido o expiró
        res.status(401).json({
            error: 'Token inválido o expirado',
            success: false,
        });
        return;
    }
};
exports.authMiddleware = authMiddleware;
