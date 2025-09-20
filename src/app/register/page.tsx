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
import {
  registerSchema,
  RegisterSchematype,
} from "../../schema/register.schema";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const form = useForm<RegisterSchematype>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(data: RegisterSchematype) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        data
      );
      if (res.data.message === "success") {
        toast.success("Register Success", {
          position: "top-center",
          duration: 3000,
        });
        router.push("/login");
      }
    } catch{
      toast.error("Cant Register Try again Later", {
        position: "top-center",
        duration: 3000,
      });
    }
  }

  return (
    <>
      <div className="w-1/4 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">Register Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <Form {...form}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-5">Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-5">Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-5">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-5">Confirm The Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
                    <FormLabel className="mt-5">Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            <Button className="mt-5 cursor-pointer w-full">Register</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
