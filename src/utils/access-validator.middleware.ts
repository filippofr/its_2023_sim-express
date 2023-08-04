import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { validate as classValidate } from 'class-validator';
import { ValidationError } from "../errors/validation";
import { TypedRequest } from "./typed-request.interface";
import { NotFoundError } from "../errors/not-found";
import { Todos as TodoModel } from '../api/to-dos/todo.model'
import { MissingTokenError } from "../errors/missing-token";

export const AccessValidator = (type: 'two' | 'one' = 'two') => {
  return async (req: TypedRequest<any, any, any>, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const todoId = req.params.id;

    const q: any = {
      createdBy: userId,
    };

    if (type === 'two') {
      q.$or = [{ assignedTo: userId }, { _id: todoId }];
    } else {
      q._id = todoId;
    }

    try {
      const todo = await TodoModel.findOne(q);

      if (todo) {
        next();
      } else {
        res.status(404);
        res.send('You cannot edit this Todo or this Todo does not exist.')
      }
    } catch (err) {
      next(err);
    }
  };
};