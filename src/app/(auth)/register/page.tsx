"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  formState,
  RegisterFormSchema,
  RegisterFormSchemaType,
} from "@/schema/Register.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { HandelRegister } from "@/services/register.service";
import { useActionState, useEffect } from "react";

export default function RegistrPage() {
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const router = useRouter();


const [action, formAction] = useActionState(HandelRegister, formState);

useEffect(() => {
  if(action){
    if (!action.success && action.message) {
      toast.error(action.message, {
        position: "top-center",
        duration: 4000,
      });
    }
    if (action.success && action.message) {
      toast.success(action.message, {
        position: "top-center",
        duration: 4000,
      });
      router.push("/login");
    }
  }
},[action, router]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Registration Form
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Please fill in the form below to create an account.{" "}
        </p>

        <Form {...form}>
          <form action={formAction} className="space-y-6">
        
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" >{action.error?.name?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username@domain.com"
                      {...field}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" >{action.error?.email?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      {...field}
                      type="password"
                      autoComplete="off"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" >{action.error?.password?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      {...field}
                      type="password"
                      autoComplete="off"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" >{action.error?.rePassword?.[0]}</FormMessage>
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
                      placeholder="01xxxxxxxxx"
                      {...field}
                      type="tel"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" >{action.error?.phone?.[0]}</FormMessage>
                </FormItem>
              )}
            />



            <div className="flex justify-between items-center text-sm text-gray-500">
              <span></span>
              <a
                href="#"
                className="hover:text-blue-500 transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
