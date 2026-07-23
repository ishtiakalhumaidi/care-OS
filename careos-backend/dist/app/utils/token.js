import jwt from "jsonwebtoken";
import { envVars } from "../config/env.js";
const generateAccessToken = (user) => {
    return jwt.sign({ userId: user.id, role: user.role }, envVars.ACCESS_TOKEN_SECRET, { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN });
};
const generateRefreshToken = (user) => {
    return jwt.sign({ userId: user.id }, envVars.REFRESH_TOKEN_SECRET, { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN });
};
const generateAuthTokens = (user) => {
    return {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
    };
};
const verifyRefreshToken = (token) => {
    return jwt.verify(token, envVars.REFRESH_TOKEN_SECRET);
};
export const TokenUtils = {
    generateAccessToken,
    generateRefreshToken,
    generateAuthTokens,
    verifyRefreshToken,
};
