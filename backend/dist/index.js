"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importamos las dependencias que vamos a usar 
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const tasks_routes_1 = __importDefault(require("./routes/tasks-routes"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const auth_middleware_1 = require("./middlewares/auth-middleware");
const error_middleware_1 = require("./middlewares/error-middleware");
const validate_middleware_1 = require("./middlewares/validate-middleware");
// Cargamos las variables de entorno desde el archivo .env
dotenv_1.default.config();
// Mostramos en consola las variables cargadas desde el entorno
console.log("⚙️ Variables de entorno cargadas:");
console.log("PORT:", process.env.PORT);
console.log("API_TASKS_URL:", process.env.API_TASKS_URL);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
// Inicializamos la aplicación de Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares globales
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Servir archivos estáticos desde carpeta client
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client')));
// Rutas específicas para las páginas web
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/login.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/login.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dashboard.html'));
});
// Middleware de autenticación (se ejecuta antes que los demás)
app.use(auth_middleware_1.authMiddleware);
// Rutas de API
app.use('/api/auth', auth_routes_1.default);
app.use(process.env.API_TASKS_URL || '/api/tasks', tasks_routes_1.default);
// Middlewares de validación y manejo de errores
app.use(validate_middleware_1.validateMiddleware);
app.use(error_middleware_1.errorMiddleware);
//Middleware para manejar solicitudes a rutas que no existen en la app (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});
// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
