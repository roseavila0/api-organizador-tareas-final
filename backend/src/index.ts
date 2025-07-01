//importamos las dependencias que vamos a usar 
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import tasksRoutes from './routes/tasks-routes';
import authRoutes from './routes/auth-routes';
import { authMiddleware } from './middlewares/auth-middleware';
import { errorMiddleware } from './middlewares/error-middleware';
import { validateMiddleware } from './middlewares/validate-middleware';


// Cargamos las variables de entorno desde el archivo .env
dotenv.config();
// Mostramos en consola las variables cargadas desde el entorno
console.log("⚙️ Variables de entorno cargadas:");
console.log("PORT:", process.env.PORT);
console.log("API_TASKS_URL:", process.env.API_TASKS_URL);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Inicializamos la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde carpeta client
app.use(express.static(path.join(__dirname, '../../client')));

// Rutas específicas para las páginas web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/login.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dashboard.html'));
});

// Middleware de autenticación (se ejecuta antes que los demás)
//app.use(authMiddleware);

// Rutas de API
app.use('/api/auth', authRoutes);
app.use(process.env.API_TASKS_URL || '/api/tasks',authMiddleware, tasksRoutes);

// Middlewares de validación y manejo de errores
app.use(validateMiddleware);
app.use(errorMiddleware);

//Middleware para manejar solicitudes a rutas que no existen en la app (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});


// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
