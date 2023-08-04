import { NextFunction, Request, Response } from "express";

export class MissingTokenError extends Error {
  constructor() {
    super();
    this.name = 'MissingTokenError';
    this.message = 'Access token is missing or invalid';
  }
}

export const missingTokenHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof MissingTokenError) {
    res.status(400);
    res.json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
}