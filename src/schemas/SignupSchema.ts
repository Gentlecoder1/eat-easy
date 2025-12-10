import { z } from "zod";
import parsePhoneNumber from "libphonenumber-js";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least two characters" }),

  email: z.string().email({ message: "Invalid email" }),

phoneNumber: z
  .string()
  .min(1, "Phone number is required")
  .refine((value: string) => {
    try {
      const phone = parsePhoneNumber(value);
      return phone ? phone.isValid() : false;
    } catch {
      return false;
    }
  }, "Invalid phone number"),

  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters" }),
});
