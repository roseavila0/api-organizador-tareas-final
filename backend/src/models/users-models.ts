// Este archivo gestiona la lectura de usuarios desde el archivo JSON y ofrece funciones para autenticación y listado de usuarios.

import fs from 'fs';
import path from 'path';


// Interfaz que define la estructura de un usuario
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

class UsersModel {
  private dataPath: string;

  constructor() {
       // Ruta absoluta al archivo users.json
    this.dataPath = path.join(__dirname, '../data/users.json');
  }


  
  // Lee y retorna todos los usuarios desde el archivo JSON
  private readUsers(): User[] {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users file:', error);
      return [];
    }
  }


    // Busca un usuario por su email
  findUserByEmail(email: string): User | undefined {
    const users = this.readUsers();
    return users.find((user) => user.email === email);
  }


  // Valida email y contraseña; si son correctos, devuelve los datos del usuario sin contraseña
  validateUser(email: string, password: string): User | null {
    const user = this.findUserByEmail(email);
    if (user && user.password === password) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        password: '',
      };
    }
    return null;
  }


  // Retorna todos los usuarios sin incluir sus contraseñas (para propósitos administrativos o visualización)
  getAllUsers(): Omit<User, 'password'>[] {
    const users = this.readUsers();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }));
  }
}



// Exportamos una instancia única del modelo
export const usersModel = new UsersModel();
