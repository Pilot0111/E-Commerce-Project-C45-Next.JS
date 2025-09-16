import * as z from "zod";

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required." })
      .min(3, { message: "Name must be at least 3 characters." })
      .max(32, { message: "Name must be at most 32 characters." }),
    email: z.email({ message: "Invalid email address." }),
    password: z
      .string()
      .nonempty({ message: "Password is required." })
      .min(6, { message: "Password must be at least 6 characters." })
      .max(32, { message: "Password must be at most 32 characters." }),
    rePassword: z
      .string()
      .nonempty({ message: "Password is required." })
      .min(6, { message: "Password must be at least 6 characters." })
      .max(32, { message: "Password must be at most 32 characters." }),
    phone: z
      .string()
      .nonempty({ message: "Phone number is required." })
      .regex(/^(?:002|\+2)?01[0-5][0-9]{8}$/, {
        message: "Invalid egyptian Phone number.",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

export const formState={
  success: false,
  error: {},
  message: null,
}

export type formStateType ={
  success:boolean;
  error: {
    name?: string | string[];
    email?: string | string[];
    password?: string  | string[];
    rePassword?: string | string[];
    phone?: string | string[];
  };
  message: string|null;
}