"use strict";
// Este archivo gestiona la lectura de usuarios desde el archivo JSON y ofrece funciones para autenticación y listado de usuarios.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersModel = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class UsersModel {
    constructor() {
        // Ruta absoluta al archivo users.json
        this.dataPath = path_1.default.join(__dirname, '../data/users.json');
    }
    // Lee y retorna todos los usuarios desde el archivo JSON
    readUsers() {
        try {
            const data = fs_1.default.readFileSync(this.dataPath, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error reading users file:', error);
            return [];
        }
    }
    // Busca un usuario por su email
    findUserByEmail(email) {
        const users = this.readUsers();
        return users.find((user) => user.email === email);
    }
    // Valida email y contraseña; si son correctos, devuelve los datos del usuario sin contraseña
    validateUser(email, password) {
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
    getAllUsers() {
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
exports.usersModel = new UsersModel();
