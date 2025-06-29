// Este middleware bloquea el acceso si no se envía un token válido:
//✅ Úsalo si quieres proteger rutas que no cualquiera debería tocar, como las de crear, actualizar o borrar frases.

import express, { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers['authorization'];
  if (!token || token !== process.env.AUTH_TOKEN) {
    // Si no hay token o si el token no es exactamente "Bearer my-secret-token", entonces…   // Devuelve un error con código 401 (que significa "No autorizado").  // Manda un mensaje en JSON diciendo que no está autorizado.   // return detiene la función para que NO siga al siguiente paso.

    res.status(401).json({ error: 'No autorizado' });
    return;
  }
  next(); // Si el token sí existe y sí es correcto, entonces la solicitud está autorizada. next() le dice a Express: “ok, pasa al siguiente middleware o a la ruta que sigue”.
};
