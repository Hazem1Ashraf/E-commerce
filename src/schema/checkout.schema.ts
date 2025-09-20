import * as z from "zod";

export const checkOutSchema = z.object({
  details: z
    .string({ message: "Cant be empty" })
    .nonempty({ message: "details is required." }),
  phone: z
    .string({ message: "phone Cant be empty" })
    .nonempty({ message: "details is required." }).regex(/^01[0-2,5]{1}[0-9]{8}$/, {message:"not a valid egyptian phone number"}),
  city: z
    .string({ message: "city Cant be empty" })
    .nonempty({ message: "details is required." }),
});

export type checkOutSchematype = z.infer<typeof checkOutSchema>;
