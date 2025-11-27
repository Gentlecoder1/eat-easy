import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least two characters" }),
  email: z.email({ message: "Invalid email" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" })
    .regex(/^\+?\d+$/, {
      message: "Phone number can only contain digits",
    }),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters" }),
});
