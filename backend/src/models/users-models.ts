import fs from 'fs';
import path from 'path';

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
    this.dataPath = path.join(__dirname, '../data/users.json');
  }

  private readUsers(): User[] {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users file:', error);
      return [];
    }
  }

  findUserByEmail(email: string): User | undefined {
    const users = this.readUsers();
    return users.find((user) => user.email === email);
  }

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

export const usersModel = new UsersModel();
