import { Request, Response } from 'express';
import { usersModel } from '../models/users-models';

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: 'Email y contraseña son requeridos',
      success: false,
    });
    return;
  }

  const user = usersModel.validateUser(email, password);

  if (!user) {
    res.status(401).json({
      error: 'Credenciales incorrectas',
      success: false,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Login exitoso',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};

export const getUsers = (req: Request, res: Response): void => {
  const users = usersModel.getAllUsers();
  res.json(users);
};
