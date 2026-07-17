import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { envVars } from "../config/env.js";
import AppError from "../errorHelpers/AppError.js";
import status from "http-status";
const transporter = nodemailer.createTransport({
    host: envVars.EMAIL_SENDER.SMTP_HOST,
    port: Number(envVars.EMAIL_SENDER.SMTP_PORT),
    auth: {
        user: envVars.EMAIL_SENDER.SMTP_USER,
        pass: envVars.EMAIL_SENDER.SMTP_PASS,
    },
});
export const sendTemplatedEmail = async (to, subject, templateName, templateData) => {
    try {
        const templatePath = path.resolve(process.cwd(), `src/app/templates/${templateName}.ejs`);
        const html = await ejs.renderFile(templatePath, templateData);
        await transporter.sendMail({
            from: `"CareOS System" <${envVars.EMAIL_SENDER.SMTP_FROM}>`,
            to,
            subject,
            html,
        });
    }
    catch (error) {
        console.error("Email sending failed:", error);
        throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to send email");
    }
};
