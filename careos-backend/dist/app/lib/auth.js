import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, emailOTP } from "better-auth/plugins";
import { envVars } from "../config/env.js";
import { prisma } from "./prisma.js";
import { sendTemplatedEmail } from "../utils/emailSender.js";
const mockSendEmail = async ({ email, subject, otp, }) => {
    console.log(`[EMAIL MOCK] To: ${email} | Subject: ${subject} | OTP: ${otp}`);
};
export const auth = betterAuth({
    baseURL: envVars.BETTER_AUTH_URL,
    secret: envVars.BETTER_AUTH_SECRET,
    // Connect BetterAuth to Prisma using the official adapter
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    // Map our custom Prisma fields to the BetterAuth User object
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "GUARDIAN",
            },
            isActive: {
                type: "boolean",
                required: true,
                defaultValue: true,
            },
            needPasswordChange: {
                type: "boolean",
                required: true,
                defaultValue: false,
            },
            isDeleted: {
                type: "boolean",
                required: true,
                defaultValue: false,
            },
            deletedAt: {
                type: "date",
                required: false,
                defaultValue: null,
            },
            tenantId: {
                type: "string",
                required: false,
                defaultValue: null,
            },
        },
    },
    plugins: [
        bearer(),
        emailOTP({
            overrideDefaultEmailVerification: true,
            async sendVerificationOTP({ email, otp, type }) {
                const user = await prisma.user.findUnique({ where: { email } });
                const name = user ? user.name : "User";
                if (type === "email-verification") {
                    if (user && user.role === "SUPER_ADMIN")
                        return;
                    await sendTemplatedEmail({
                        to: email,
                        subject: "Verify your CareOS Email",
                        templateName: "otp",
                        templateData: {
                            name,
                            otp,
                        },
                    });
                }
                else if (type === "forget-password") {
                    await sendTemplatedEmail({
                        to: email,
                        subject: "CareOS Password Reset Code",
                        templateName: "otp",
                        templateData: {
                            name,
                            otp,
                        },
                    });
                }
            },
            expiresIn: 2 * 60,
            otpLength: 6,
        }),
    ],
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24,
        },
    },
    trustedOrigins: [envVars.FRONTEND_URL],
    advanced: {
        useSecureCookies: envVars.NODE_ENV === "production",
        generateId: false,
    },
});
