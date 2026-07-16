import { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

export const validateRequest = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // If dealing with FormData (like file uploads), parse it first
            if (req.body.data && typeof req.body.data === 'string') {
                req.body = JSON.parse(req.body.data);
            }

            // Parse and sanitize the incoming request payload
            const parsedResult = await schema.parseAsync(req.body);
            req.body = parsedResult;
            
            next();
        } catch (error) {
            next(error);
        }
    };
};