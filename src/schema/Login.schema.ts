import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email({ message: "Invalid email address." }),
  password: z
    .string()
    .nonempty({ message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." })
    .max(32, { message: "Password must be at most 32 characters." }),
});



export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
