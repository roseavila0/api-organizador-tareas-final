"use strict";
// tasks-models.ts
/*
 Este archivo actúa como el modelo de datos para las tareas (tasks).
 Simula una base de datos utilizando un archivo JSON local.
 Contiene métodos estáticos para obtener, crear, actualizar y eliminar tareas.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksModel = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Ruta al archivo JSON que simula la base de datos
const filePath = path_1.default.join(__dirname, '../data/tasks.json');
class tasksModel {
    // 📥 Obtener todas las tareas
    static getAllTasks() {
        const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        // lee el contedion del archivo json y lo convierta a js
        return data.tasks;
    }
    // addTask(newTask) ----Agrega una nueva tarea:
    static addTask(newTask) {
        const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        // lee el contedion del archivo json y lo convierta a js
        const newId = (data.tasks.length + 1).toString();
        // genera un nuevo id tomando en cuenta la longitud del array
        const task = Object.assign(Object.assign({}, newTask), { id: newId });
        // crea un tarea nueva agregando el id que generamos
        data.tasks.push(task);
        // agrego la tarea al array
        data.info.total += 1;
        // incremento el contador total
        fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2));
        // guardamos lo datos actualizados en el json
        return task;
        // devuelve la tarea
    }
    //  Actualizar una tarea por ID
    static updateTask(id, updatedData) {
        const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        const index = data.tasks.findIndex((task) => task.id === id);
        if (index === -1)
            return null;
        // Actualizamos la tarea existente con los nuevos datos
        data.tasks[index] = Object.assign(Object.assign({}, data.tasks[index]), updatedData);
        // Escribimos los datos actualizados al archivo
        fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return data.tasks[index];
    }
    // 🗑️ Eliminar una tarea por ID
    static deleteTask(id) {
        const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        // lee el contenido del archivo json y lo convierta a js
        const index = data.tasks.findIndex((task) => task.id === id);
        // encuentra el indice de la tarea que coincide con el id
        if (index === -1)
            return false;
        // Eliminamos la tarea del array
        data.tasks.splice(index, 1);
        // Actualizamos el contador total
        data.info.total -= 1;
        fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    }
}
exports.tasksModel = tasksModel;
