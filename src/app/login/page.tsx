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
import { loginSchema, loginSchematype } from "@/schema/login.schema";
import {signIn} from "next-auth/react"
import Link from "next/link";
export default function Login() {
  const form = useForm<loginSchematype>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

async function handleLogin(data: loginSchematype) {
  const response = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
    callbackUrl: "/"
  });
  if (response?.ok) {
    toast.success("Login successful", { duration: 2000 ,position:"top-center"});
    window.location.href ="/"
  } else {
    toast.error("Invalid credentials",{ duration: 2000 ,position:"top-center"});
  }

}
  return (
    <>
      <div className="w-1/4 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <Form {...form}>
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
            </Form>

            <Button className="mt-5 cursor-pointer w-full">Login</Button>
          </form>
        </Form>
        <div className="flex flex-col items-center justify-center">      
      <Link
        href="/forgot-password"
        className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-2"
      >
        Forgot your password?
      </Link>
    </div>
      </div>
    </>
  );
  }
