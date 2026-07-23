/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import status from "http-status";
import { envVars } from "../config/env.js";
import AppError from "../errorHelpers/AppError.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_URL = "https://res.cloudinary.com/dx8wvgbuy/image/upload/v1784540254/svg-code-256x256_zztlwi.png";
export const transporter = nodemailer.createTransport({
    host: envVars.EMAIL_SENDER.SMTP_HOST,
    port: Number(envVars.EMAIL_SENDER.SMTP_PORT),
    secure: Number(envVars.EMAIL_SENDER.SMTP_PORT) === 465,
    auth: {
        user: envVars.EMAIL_SENDER.SMTP_USER,
        pass: envVars.EMAIL_SENDER.SMTP_PASS,
    },
});
transporter
    .verify()
    .then(() => {
    console.log("🚀 Mail server is ready");
})
    .catch((error) => {
    console.error("Mail server error:", error);
});
export const sendTemplatedEmail = async ({ to, subject, templateName, templateData, attachments, }) => {
    try {
        const templatePath = path.resolve(__dirname, "../templates", `${templateName}.ejs`);
        // Every template gets logoUrl for free — explicit templateData still
        // wins if a call site ever needs to override it, since it's spread last.
        const html = await ejs.renderFile(templatePath, {
            logoUrl: LOGO_URL,
            ...templateData,
        });
        const info = await transporter.sendMail({
            from: `"CareOS System" <${envVars.EMAIL_SENDER.SMTP_USER}>`,
            to,
            subject,
            html,
            attachments: attachments?.map((attachment) => ({
                filename: attachment.filename,
                content: attachment.content,
                contentType: attachment.contentType,
            })),
        });
        console.log(`Email sent to ${to}: ${info.messageId}`);
        return info;
    }
    catch (error) {
        console.error("[EMAIL ERROR] Failed to send email:", error.message || error);
        if (error.code) {
            console.error("Error Code:", error.code);
        }
        if (error.response) {
            console.error("SMTP Response:", error.response);
        }
        throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to send email. Please try again later.");
    }
};
