import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";
import AppError from "../errorHelpers/AppError.ts";
import { handleZodError } from "../errorHelpers/handleZodError.ts";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface.ts";
import { envVars } from "../config/env.ts";

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (envVars.NODE_ENV === 'development') {
        console.error("Error from Global Error Handler:", err);
    }

    let errorSources: TErrorSources[] = [];
    let statusCode: number = status.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal Server Error';
    let stack: string | undefined = undefined;

    // Handle Zod Validation Errors
    if (err instanceof z.ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode as number;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack = err.stack;
    } 
    // Handle Custom AppErrors
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        stack = err.stack;
        errorSources = [{ path: '', message: err.message }];
    }
    // Handle Standard Errors
    else if (err instanceof Error) {
        statusCode = status.INTERNAL_SERVER_ERROR;
        message = err.message;
        stack = err.stack;
        errorSources = [{ path: '', message: err.message }];
    }

    const errorResponse: TErrorResponse = {
        success: false,
        message: message,
        errorSources,
        stack: envVars.NODE_ENV === 'development' ? stack : undefined,
    };

    res.status(statusCode).json(errorResponse);
};