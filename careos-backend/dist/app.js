import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "path";
import { envVars } from "./app/config/env.js";
import { IndexRoutes } from "./app/routes/index.js";
import { auth } from "./app/lib/auth.js";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler.js";
import { notFound } from "./app/middleware/notFound.js";
const app = express();
// Template Engine Setup
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));
// Global Middleware
app.use(helmet());
app.use(cors({
    origin: [
        envVars.FRONTEND_URL,
        envVars.BETTER_AUTH_URL,
        "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Mount BetterAuth API
app.use("/api/auth", toNodeHandler(auth));
// Mount Master Route
app.use("/api/v1", IndexRoutes);
// Base Route
app.get("/", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "CareOS API is operational",
    });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
