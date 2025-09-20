"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cashOnDeliveryCheckout,
  cashOnDeliveryCheckoutType,
} from "@/schema/cashOnDeliveryCheckout.schema";
import cashPayment from "@/checkoutActions/cashOnDelivery.action";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CashOnDelivery() {
  const params = useParams();
  const router = useRouter();
  const cartId = params?.id as string;

  const form = useForm<cashOnDeliveryCheckoutType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(cashOnDeliveryCheckout),
  });

  async function handleCashCheckout(data: cashOnDeliveryCheckoutType) {
    try {
      const res = await cashPayment(cartId, {
        details: data.details,
        phone: data.phone,
        city: data.city,
      });

      toast.success("✅ Cash order created successfully!", { duration: 2000 ,position:"top-center"}); 
      console.log("Cash Order:", res);

      router.push("/orders");
    } catch {
      toast.success("❌ Failed to create cash order: ", { duration: 2000 ,position:"top-center"}); 

    }
  }

  return (
    <div className="w-1/3 mx-auto my-12 p-6 rounded-2xl shadow-lg bg-white">
      <h1 className="text-3xl text-center font-bold my-6 text-gray-800">
        Cash on Delivery
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCashCheckout)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Details</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter address details"
                    {...field}
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    {...field}
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter city"
                    {...field}
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full mt-6 bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-xl shadow-md"
            type="submit"
          >
            Confirm Cash Order
          </Button>
        </form>
      </Form>
    </div>
  );
}
