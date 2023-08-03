import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { AddTodoDTO, SetCompletedDTO } from "./todo.dto";
import { add, list, setComplete, setDecomplete } from "./todo.controller";


const router = Router();

router.use(isAuthenticated);
router.get('/', list);
router.post('/', validate(AddTodoDTO, 'body'), add);
router.patch('/:id/check',
            validate(SetCompletedDTO, 'params'),
            setComplete);
router.patch('/:id/uncheck',
            validate(SetCompletedDTO, 'params'),
            setDecomplete);


export default router;