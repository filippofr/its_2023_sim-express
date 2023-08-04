import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { AddTodoDTO, QueryTodoDTO, SetCompletedDTO, AssignmentParamsDTO, AssignmentBodyDTO } from "./todo.dto";
import { add, assign, list, setComplete, setUncomplete } from "./todo.controller";
import { AccessValidator } from "../../utils/access-validator.middleware";


const router = Router();

router.use(isAuthenticated);
router.get('/', validate(QueryTodoDTO, 'query'), list);
router.post('/', validate(AddTodoDTO, 'body'), add);
router.patch('/:id/check',
            AccessValidator('one'),
            validate(SetCompletedDTO, 'params'),
            setComplete);
router.patch('/:id/uncheck',
            AccessValidator('one'),
            validate(SetCompletedDTO, 'params'),
            setUncomplete);
router.post('/:id/assign',
            AccessValidator('two'),
            validate(AssignmentParamsDTO, 'params'), validate(AssignmentBodyDTO, 'body'),
            assign);


export default router;