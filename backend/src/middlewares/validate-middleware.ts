import express, { Request, Response, NextFunction } from 'express';

export const validateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
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
  next();
};
