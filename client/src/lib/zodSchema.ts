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

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.array(z.string().trim().min(1, "Content connot be empty")),
  image: z.custom<FileList>(
    (v) => v instanceof FileList && v.length > 0,
    "Image is required"
  ),
  tags: z.array(z.string().min(1, "Tag connot be empty"))
  .max(10, "Maximum 10 tags allowed")
  .refine(
    (tags) => new Set(tags.map((t) => t.toLowerCase())).size === tags.length,
    "Tags must be unique"
  ),
  category: z.enum(["General", "Technology", "Lifestyle", "Health", "Travel", "Education", "Food", "Finance", "Entertainment", "Sports", "Fashion","Others"],{
     message: "Select a category" }),
  readingTime: z
    .string()
    .trim()
    .regex(/^\d+\s*(min|mins|minute|minutes)$/i, 'Use format like "5 min"'),
})

export type SignUpType = z.infer<typeof signUpSchema>;
export type SignInType = z.infer<typeof signInSchema>
export type BlogType = z.infer<typeof blogSchema>;
