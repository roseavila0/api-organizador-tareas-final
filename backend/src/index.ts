// index.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
//import bodyParser from "body-parser";
import path from 'path';
import dotenv from 'dotenv';
import tasksRoutes from './routes/tasks-routes';
import authRoutes from './routes/auth-routes';
import { authMiddleware } from './middlewares/auth-middleware';
import { errorMiddleware } from './middlewares/error-middleware';
import { validateMiddleware } from './middlewares/validate-middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());

// Servir archivos estáticos desde carpeta client
app.use(express.static(path.join(__dirname, '../../client')));

// Rutas de API
app.use('/api/auth', authRoutes);
app.use(process.env.API_TASKS_URL || '/api/tasks', tasksRoutes);

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

//Middleware para manejar solicitudes a rutas que no existen en la app
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

app.use(authMiddleware);
app.use(errorMiddleware);
app.use(validateMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
