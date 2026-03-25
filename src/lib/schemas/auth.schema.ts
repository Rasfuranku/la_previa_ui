import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  full_name: z.string().optional(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const UserResponse = z.object({
  id: z.number(),
  email: z.string().email(),
  full_name: z.string().nullable().optional(),
  is_active: z.boolean(),
  is_superuser: z.boolean(),
  provider: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
