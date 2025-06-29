import { Router } from 'express';
import { login, getUsers } from '../controllers/auth-controllers';
import { validateMiddleware } from '../middlewares/validate-middleware';

const router: Router = Router();

router.post('/login', login);
router.get('/users', getUsers);

export default router;
