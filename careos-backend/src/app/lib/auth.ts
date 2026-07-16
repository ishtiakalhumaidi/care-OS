import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, emailOTP } from "better-auth/plugins";
import { envVars } from "../config/env.ts";
import { prisma } from "./prisma.ts";

const mockSendEmail = async ({ email, subject, otp }: { email: string, subject: string, otp: string }) => {
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
                defaultValue: "GUARDIAN"
            },
            isActive: {
                type: "boolean",
                required: true,
                defaultValue: true
            },
            needPasswordChange: {
                type: "boolean",
                required: true,
                defaultValue: false
            },
            isDeleted: {
                type: "boolean",
                required: true,
                defaultValue: false
            },
            deletedAt: {
                type: "date",
                required: false,
                defaultValue: null
            },
            tenantId: {
                type: "string",
                required: false,
                defaultValue: null
            }
        }
    },

    plugins: [
        bearer(),
        emailOTP({
            overrideDefaultEmailVerification: true,
            async sendVerificationOTP({ email, otp, type }) {
                if (type === "email-verification") {
                    const user = await prisma.user.findUnique({ where: { email } });
                    if (!user) return;
                    
                    // Skip OTP for Super Admins based on reference logic
                    if (user.role === "SUPER_ADMIN") return;

                    if (!user.emailVerified) {
                        await mockSendEmail({
                            email,
                            subject: "Verify your email for CareOS",
                            otp,
                        });
                    }
                } else if (type === "forget-password") {
                    await mockSendEmail({
                        email,
                        subject: "CareOS Password Reset OTP",
                        otp,
                    });
                }
            },
            expiresIn: 2 * 60, // 2 minutes
            otpLength: 6,
        })
    ],

    session: {
        expiresIn: 60 * 60 * 24 * 7, 
        updateAge: 60 * 60 * 24,     
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24, 
        }
    },

    trustedOrigins: [envVars.FRONTEND_URL],

    advanced: {
        useSecureCookies: envVars.NODE_ENV === "production",
        generateId: false, 
    }
});