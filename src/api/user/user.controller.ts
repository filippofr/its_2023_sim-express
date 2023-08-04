import { NextFunction, Response, Request } from "express";
import { User } from "./user.model";

export const me = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json(req.user!);
}

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user!;
  const list = await User.find({});
  res.json(list);
}