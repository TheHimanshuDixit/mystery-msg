import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(3, "Username must be minimum 3 length")
  .max(20, "Username must be maximum 20 length")
  .regex(
    /^[a-zA-Z0-9_]*$/,
    "Username must be alphanumeric and can contain underscore"
  );

export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be minimum 6 length"),
});
