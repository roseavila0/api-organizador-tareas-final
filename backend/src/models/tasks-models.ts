/*
tasks-models.ts: El modelo que se conecta con los datos reales
Este archivo usa un archivo .json como si fuera una base de datos, y define métodos estáticos para trabajar con las tasks.
*/

import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../data/tasks.json');
// definimos la ruta al archivo json que actua como bd de las tasks // Aquí se define la ruta al archivo donde se almacenan las tasks (tasks.json).

//ESTRUCTURA DE UNA TASK --- Cada TASK tiene:       id: identificador único     -    task: el contenido de la tarea   -  dueDate: fecha limite para hacer la tarea
interface Task {
  id: string;
  task: string;
  dueDate: string;
}

// getAllTasks() -----Devuelve todas las tareas del archivo .json:
export class tasksModel {
  static getAllTasks(): Task[] {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    // lee el contedion del archivo json y lo convierta a js
    return data.tasks;
  }

  // addTask(newTask) ----Agrega una nueva tarea:
  static addTask(newTask: Task): Task {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    // lee el contedion del archivo json y lo convierta a js
    const newId = (data.tasks.length + 1).toString();
    // genera un nuevo id tomando en cuenta la longitud del array
    const task = { ...newTask, id: newId };
    // crea un tarea nueva agregando el id que generamos

    data.tasks.push(task);
    // agrego la tarea al array
    data.info.total += 1;
    // incremento el contador
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    // guardamos lo datos actualizados en el json
    return task;
    // devuelve la tarea
  }

  static updateTask(id: string, updatedData: Partial<Task>): Task | null {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const index = data.tasks.findIndex((task: Task) => task.id === id);
    if (index === -1) return null;

    // Actualizamos la tarea existente con los nuevos datos
    data.tasks[index] = { ...data.tasks[index], ...updatedData };

    // Escribimos los datos actualizados al archivo
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return data.tasks[index];
  }

  static deleteTask(id: string): boolean {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    // lee el contenido del archivo json y lo convierta a js
    const index = data.tasks.findIndex((task: Task) => task.id === id);
    // encuentra el indice de la tarea que coincide con el id
    if (index === -1) return false;
    data.tasks.splice(index, 1);
    data.info.total -= 1;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  }
}
