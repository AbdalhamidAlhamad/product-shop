import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ErrorHandler(
    `The url ${req.originalUrl} is not found`,
    404
  );
  res.status(404);
  next(error);
};
