import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVars } from "../config/env.js";

interface ITokenUser {
  id: string;
  role: string;
}

interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

const generateAccessToken = (user: ITokenUser): string => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN } as SignOptions,
  );
};

const generateRefreshToken = (user: ITokenUser): string => {
  return jwt.sign(
    { userId: user.id },
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN } as SignOptions,
  );
};

const generateAuthTokens = (user: ITokenUser): IAuthTokens => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, envVars.REFRESH_TOKEN_SECRET) as JwtPayload;
};

export const TokenUtils = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthTokens,
  verifyRefreshToken,
};