import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import AppError from "../errorHelpers/AppError.js";
import status from "http-status";

export const handleMulterError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof multer.MulterError) {
    return next(
      new AppError(status.BAD_REQUEST, `Photo upload failed: ${err.message}`),
    );
  }
  next(err);
};
