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
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { checkOutSchematype, checkOutSchema } from "@/schema/checkout.schema";
import onlinePayment from "@/checkoutActions/onlineCheckOut.action";
import { useParams } from "next/navigation";

export default function Checkout() {
const params = useParams();
const id = params?.id as string;

  const form = useForm<checkOutSchematype>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkOutSchema),
  });

  async function handlecheckout(data: checkOutSchematype) {
    const res = await onlinePayment(id, "", data);

    if(res.status==="sucess"){
      window.location.href=res.session.url
    }
    else{
      
            toast.error("❌ Error Api Error ", {
              duration: 2000,
              position: "top-center",
            });
    }
  }
  return (
    <>
      <div className="w-1/4 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">checkout</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlecheckout)}>
            <Form {...form}>
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-5">details</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                    <FormLabel className="mt-5">phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
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
                    <FormLabel className="mt-5">city</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            <Button className="mt-5 cursor-pointer w-full">Pay now</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
