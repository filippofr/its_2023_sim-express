import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { AddTodoDTO, QueryTodoDTO, SetCompletedDTO, AssignmentParamsDTO, AssignmentBodyDTO, DeleteDTO } from "./todo.dto";
import { add, assign, list, remove, setComplete, setUncomplete } from "./todo.controller";
import { accessValidator } from "../../utils/access-validator.middleware";


const router = Router();

router.use(isAuthenticated);
router.get('/', validate(QueryTodoDTO, 'query'), list);
router.post('/', validate(AddTodoDTO, 'body'), add);
router.patch('/:id/check',
            accessValidator('set'),
            validate(SetCompletedDTO, 'params'),
            setComplete);
router.patch('/:id/uncheck',
            accessValidator('set'),
            validate(SetCompletedDTO, 'params'),
            setUncomplete);
router.post('/:id/assign',
            accessValidator('assign'),
            validate(AssignmentParamsDTO, 'params'), validate(AssignmentBodyDTO, 'body'),
            assign);
router.delete('/:id',
              accessValidator('assign'),
              validate(DeleteDTO, 'params'),
              remove);


export default router;