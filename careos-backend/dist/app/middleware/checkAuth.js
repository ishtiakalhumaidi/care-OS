import status from "http-status";
import jwt from "jsonwebtoken";
import { envVars } from "../config/env.js";
import AppError from "../errorHelpers/AppError.js";
import { prisma } from "../lib/prisma.js";
export const checkAuth = (...requiredRoles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new AppError(status.UNAUTHORIZED, "You are not authorized! Token is missing.");
            }
            const token = authHeader.split(" ")[1];
            console.log("Token received in checkAuth middleware:", token);
            let decoded;
            try {
                decoded = jwt.verify(token, envVars.ACCESS_TOKEN_SECRET);
            }
            catch (error) {
                throw new AppError(status.UNAUTHORIZED, "Invalid or expired token.");
            }
            const userId = decoded.userId || decoded.id;
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new AppError(status.UNAUTHORIZED, "User associated with this token not found.");
            }
            if (user.isDeleted) {
                throw new AppError(status.FORBIDDEN, "This user account is deleted.");
            }
            if (!user.isActive) {
                throw new AppError(status.FORBIDDEN, "This user account is suspended.");
            }
            if (user.needPasswordChange &&
                req.originalUrl !== "/api/v1/auth/resolve-password-change") {
                throw new AppError(status.FORBIDDEN, "You must change your password before accessing the system.");
            }
            // 4. Role Authorization
            if (requiredRoles.length && !requiredRoles.includes(user.role)) {
                throw new AppError(status.FORBIDDEN, "You do not have the required permissions to access this route.");
            }
            req.user = user;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
