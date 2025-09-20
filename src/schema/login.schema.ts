import * as z from "zod";

export const loginSchema = z.object({

  email: z.email({ message: "Invalid email address." })
      .nonempty({ message: "Name is required." }),

  password: z
    .string()
        .nonempty({ message: "Name is required." })
    .min(6, { message: "Password must be at least 6 characters." })
    .max(50, { message: "Password must be at most 50 characters." }),

})

   export type loginSchematype = z.infer<typeof loginSchema>;