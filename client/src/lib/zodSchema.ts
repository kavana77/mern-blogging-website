import { z } from "zod";


export const signUpSchema = z.object({
  fullname: z.string().min(2, "Fullname is required"),
  email: z.string().email("Email is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
    email: z.string().email("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export type SignUpType = z.infer<typeof signUpSchema>;
export type SignInType = z.infer<typeof signInSchema>
