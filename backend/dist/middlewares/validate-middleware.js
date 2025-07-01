"use strict";
//  Middleware de validación para tareas
// Verifica que los campos 'id', 'task' y 'dueDate' estén presentes y sean cadenas de texto
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddleware = void 0;
const validateMiddleware = (req, res, next) => {
    const { id, task, dueDate } = req.body;
    if (!id || typeof id !== 'string') {
        res
            .status(400)
            .json({ error: "El campo 'id' es requerido y debe ser string" });
        return;
    }
    if (!task || typeof task !== 'string') {
        res
            .status(400)
            .json({ error: "El campo 'task' es requerido y debe ser string" });
        return;
    }
    if (!dueDate || typeof dueDate !== 'string') {
        res
            .status(400)
            .json({ error: "El campo 'dueDate' es requerido y debe ser string" });
        return;
    }
    next(); // Si todo está correcto, pasa al siguiente middleware o controlador
};
exports.validateMiddleware = validateMiddleware;
