import { ZodError } from "zod";
import status from "http-status";
import AppError from "../errorHelpers/AppError.js";
export const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            if (typeof req.body.data === "string") {
                req.body = JSON.parse(req.body.data);
            }
            req.body = await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                return next(new AppError(status.BAD_REQUEST, "Invalid JSON in request body"));
            }
            if (error instanceof ZodError) {
                return next(new AppError(status.BAD_REQUEST, error.issues.map((issue) => issue.message).join(", ")));
            }
            next(error);
        }
    };
};
