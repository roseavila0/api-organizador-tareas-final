// Middleware de manejo global de errores
// Captura errores no controlados y responde con un mensaje genérico de servidor

import express, { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
    // Mostrar error en consola para depuración
  console.error('Error: ', err.message);

  
  // Versión limpia para producción:
  res.status(500).json({ error: 'Ocurrio un error en el servidor' });
};
