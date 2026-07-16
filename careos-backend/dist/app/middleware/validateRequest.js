export const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            // If dealing with FormData (like file uploads), parse it first
            if (req.body.data && typeof req.body.data === 'string') {
                req.body = JSON.parse(req.body.data);
            }
            // Parse and sanitize the incoming request payload
            const parsedResult = await schema.parseAsync(req.body);
            req.body = parsedResult;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
