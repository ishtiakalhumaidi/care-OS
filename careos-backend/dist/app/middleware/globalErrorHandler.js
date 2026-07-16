import status from "http-status";
import z from "zod";
import AppError from "../errorHelpers/AppError.js";
import { handleZodError } from "../errorHelpers/handleZodError.js";
import { envVars } from "../config/env.js";
export const globalErrorHandler = async (err, req, res, next) => {
    if (envVars.NODE_ENV === 'development') {
        console.error("Error from Global Error Handler:", err);
    }
    let errorSources = [];
    let statusCode = status.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let stack = undefined;
    // Handle Zod Validation Errors
    if (err instanceof z.ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
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
    const errorResponse = {
        success: false,
        message: message,
        errorSources,
        stack: envVars.NODE_ENV === 'development' ? stack : undefined,
    };
    res.status(statusCode).json(errorResponse);
};
