import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "./typed-request.interface";
import { Todos as TodoModel } from '../api/to-dos/todo.model'

export const accessValidator = (type: 'set' | 'assign' = 'set') => {
  return async (req: TypedRequest<any, any, any>, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const todoId = req.params.id;

    const query: any = {
      createdBy: userId,
    };

    if (type === 'set') {
      query.$or = [{ assignedTo: userId }, { _id: todoId }];
    } else {
      query._id = todoId;
    }

    try {
      const todo = await TodoModel.findOne(query);

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