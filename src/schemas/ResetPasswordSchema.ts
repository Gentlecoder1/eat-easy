import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must have at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
