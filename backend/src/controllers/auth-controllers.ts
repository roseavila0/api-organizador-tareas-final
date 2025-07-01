//  auth-controllers.ts
// Controladores para manejar el login y la obtención de usuarios

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { usersModel } from '../models/users-models';


//  Login de usuario y generación de token
export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;

// Validación básica de campos requeridos
  if (!email || !password) {
    res.status(400).json({
      error: 'Email y contraseña son requeridos',
      success: false,
    });
    return;
  }

  // Validar credenciales contra la "base de datos"
  const user = usersModel.validateUser(email, password);

  if (!user) {
    res.status(401).json({
      error: 'Credenciales incorrectas',
      success: false,
    });
    return;
  }

  // Generar JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' },
  );

  
  // Respuesta exitosa con token y datos del usuario
  res.status(200).json({
    success: true,
    message: 'Login exitoso',
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};


//  Obtener todos los usuarios (sin contraseñas)
export const getUsers = (req: Request, res: Response): void => {
  const users = usersModel.getAllUsers();
  res.json(users);
};
