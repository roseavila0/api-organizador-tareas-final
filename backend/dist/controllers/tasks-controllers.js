"use strict";
// tasks-controllers.ts
// Controladores para manejar las operaciones sobre las tareas (tasks)
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTasks = void 0;
const tasks_models_1 = require("../models/tasks-models");
// Obtener todas las tareas
const getAllTasks = (req, res) => {
    const tasks = tasks_models_1.tasksModel.getAllTasks();
    res.json(tasks);
};
exports.getAllTasks = getAllTasks;
// Crear una nueva tarea
const createTask = (req, res) => {
    const newTask = tasks_models_1.tasksModel.addTask(req.body);
    res.status(201).json(newTask);
};
exports.createTask = createTask;
// Actualizar una tarea existente
const updateTask = (req, res) => {
    const { id } = req.params;
    const updatedTask = tasks_models_1.tasksModel.updateTask(id, req.body);
    if (!updatedTask) {
        res.status(404).json({ error: 'Task no encontrada para actualizar' });
        return;
    }
    res.status(200).json({
        message: 'Task actualizada correctamente',
        task: updatedTask
    });
};
exports.updateTask = updateTask;
// Eliminar una tarea
const deleteTask = (req, res) => {
    const { id } = req.params;
    const deletedTask = tasks_models_1.tasksModel.deleteTask(id);
    if (!deletedTask) {
        res.status(404).json({ error: 'Task no encontrada para ser borrada' });
        return;
    }
    res.status(200).json({ message: 'Task eliminada correctamente' });
};
exports.deleteTask = deleteTask;
