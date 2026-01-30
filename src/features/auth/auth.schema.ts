import * as z from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Email noto\'g\'ri formatda'),
    password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email('Email noto\'g\'ri formatda'),
});

export const otpOnlySchema = z.object({
    otp: z.string().length(4, 'OTP 4 xonali son bo\'lishi kerak'),
});

export const resetPasswordSchema = z.object({
    email: z.string().email('Email missing'),
    otp: z.string().length(4, 'OTP missing'),
    newPassword: z.string().min(6, 'Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
    confirmPassword: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Parollar mos kelmadi",
    path: ["confirmPassword"],
});

export const verifyOtpSchema = z.object({
    email: z.string().email('Email noto\'g\'ri formatda'),
    otp: z.string().length(4, 'OTP 4 xonali son bo\'lishi kerak'),
    newPassword: z.string().min(6, 'Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type OtpOnlyValues = z.infer<typeof otpOnlySchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>;
