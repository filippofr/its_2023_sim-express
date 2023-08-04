import { Router } from 'express';
import authRouter from './auth/auth.router';
import todoRouter from './to-dos/todo.router';
import userRouter from './user/user.router';

const router = Router();
router.use(authRouter);
router.use("/todos", todoRouter);
router.use("/users", userRouter);

export default router;