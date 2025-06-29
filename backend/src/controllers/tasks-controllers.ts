import { Request, Response } from 'express';
import { tasksModel } from '../models/tasks-models';

export const getAllTasks = (req: Request, res: Response): void => {
  const tasks = tasksModel.getAllTasks();
  res.json(tasks);
};

export const createTask = (req: Request, res: Response): void => {
  const newTask = tasksModel.addTask(req.body);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updatedTask = tasksModel.updateTask(id, req.body);

  if (!updatedTask) {
    res.status(404).json({ error: 'Task no encontrada para actualizar' });
    return;
  }

  res.status(200).json(updatedTask);
};

export const deleteTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deletedTask = tasksModel.deleteTask(id);

  if (!deletedTask) {
    res.status(404).json({ error: 'Task no encontrada para ser borrada' });
    return;
  }

  res.status(200).json({ message: 'Task eliminada correctamente' });
};
