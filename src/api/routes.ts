import { Router } from 'express';
import authRouter from './auth/auth.router';
import todoRouter from './to-dos/todo.router';

const router = Router();
router.use(authRouter);
router.use("/todos", todoRouter);

export default router;