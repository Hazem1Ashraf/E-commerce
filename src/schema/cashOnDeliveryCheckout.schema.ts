import { z } from "zod";

export const cashOnDeliveryCheckout = z.object({
  details: z.string().min(3, "Details must be at least 3 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  city: z.string().min(2, "City is required"),
});

export type cashOnDeliveryCheckoutType = z.infer<typeof cashOnDeliveryCheckout>;
