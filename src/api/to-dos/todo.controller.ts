import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { NotFoundError } from "../../errors/not-found";
import todosService from "./todo.service";
import { AddTodoDTO, SetCompletedDTO } from "./todo.dto";
import { Todo } from "./todo.entity";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user!;
  const list = await todosService.find(user.id!);
  res.json(list);
};

export const add = async (
  req: TypedRequest<AddTodoDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user!;
    const { title, dueDate, assignedTo } = req.body;

    const newTodo: Todo = {
      title,
      dueDate,
      assignedTo,
    };
    const saved = await todosService.add(newTodo, user.id!);
    res.json(saved);
  } catch (err) {
    next(err);
  }
};

export const setComplete = async (
  req: TypedRequest<any, any, SetCompletedDTO>,
  res: Response,
  next: NextFunction) => {
    const id = req.params.id;
    
    try {
      const updated = await todosService.update(id, {completed: true});
      res.json(updated);
    } catch(err: any) {
      next(err);
    }
}

export const setDecomplete = async (
  req: TypedRequest<any, any, SetCompletedDTO>,
  res: Response,
  next: NextFunction) => {
    const id = req.params.id;
    
    try {
      const updated = await todosService.update(id, {completed: false});
      res.json(updated);
    } catch(err: any) {
      next(err);
    }
}