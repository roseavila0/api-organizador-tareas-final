"use strict";
// Middleware de manejo global de errores
// Captura errores no controlados y responde con un mensaje genérico de servidor
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    // Mostrar error en consola para depuración
    console.error('Error: ', err.message);
    // Versión limpia para producción:
    res.status(500).json({ error: 'Ocurrio un error en el servidor' });
};
exports.errorMiddleware = errorMiddleware;
