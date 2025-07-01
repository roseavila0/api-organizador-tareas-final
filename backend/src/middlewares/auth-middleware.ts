// Middleware de autenticación con JWT
// Este middleware protege rutas restringidas verificando que se envíe un token válido en el header Authorization

import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


// Extendemos la interfaz Request para incluir el usuario decodificado
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
   // Extraer el token del encabezado Authorization (formato: Bearer <token>)
  const authHeader = req.headers['authorization'];
  const token =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7) // Remover 'Bearer ' del inicio
      : null;


  // Si no hay token, bloquear acceso
  if (!token) {
    res.status(401).json({
      error: 'Token de acceso requerido',
      success: false,
    });
    return;
  }

  try {
     // Verificar el token usando la clave secreta del entorno
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;    // Guardar la información del usuario en la petición para usarla más adelante
    next();     // Continuar con la siguiente función
  } catch (error) {
        // Si el token es inválido o expiró
    res.status(401).json({
      error: 'Token inválido o expirado',
      success: false,
    });
    return;
  }
};