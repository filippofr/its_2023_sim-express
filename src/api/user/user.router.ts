import { Router } from "express";
import { listUsers, me } from "./user.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";


const router = Router();

router.get('/me', isAuthenticated, me);
router.get('/', isAuthenticated, listUsers);

export default router;