import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required." })
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),

  email: z.email({ message: "Invalid email address." })
      .nonempty({ message: "Name is required." }),

  password: z
    .string()
        .nonempty({ message: "Name is required." })
    .min(6, { message: "Password must be at least 6 characters." })
    .max(50, { message: "Password must be at most 50 characters." }),
  rePassword: z
    .string()
        .nonempty({ message: "Name is required." })
    .min(6, { message: "Password must be at least 6 characters." })
    .max(50, { message: "Password must be at most 50 characters." }),
  phone:
  z.string()
      .nonempty({ message: "Name is required." })
    .regex(/^01[0125][0-9]{8}$/, { message: "Invalid Egyptian phone number." }),

}).refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Passwords don't match"});


   export type RegisterSchematype = z.infer<typeof registerSchema>;