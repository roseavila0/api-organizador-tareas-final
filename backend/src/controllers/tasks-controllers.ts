// tasks-controllers.ts
// Controladores para manejar las operaciones sobre las tareas (tasks)

import { Request, Response } from 'express';
import { tasksModel } from '../models/tasks-models';

// Obtener todas las tareas
export const getAllTasks = (req: Request, res: Response): void => {
  const tasks = tasksModel.getAllTasks();
  res.json(tasks);
};

// Crear una nueva tarea
export const createTask = (req: Request, res: Response): void => {
  const newTask = tasksModel.addTask(req.body);
  res.status(201).json(newTask);
};


// Actualizar una tarea existente
export const updateTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updatedTask = tasksModel.updateTask(id, req.body);

  if (!updatedTask) {
    res.status(404).json({ error: 'Task no encontrada para actualizar' });
    return;
  }

  res.status(200).json({ 
    message: 'Task actualizada correctamente',
    task: updatedTask
});

}


// Eliminar una tarea
export const deleteTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deletedTask = tasksModel.deleteTask(id);

  if (!deletedTask) {
    res.status(404).json({ error: 'Task no encontrada para ser borrada' });
    return;
  }

  res.status(200).json({ message: 'Task eliminada correctamente' });
};
