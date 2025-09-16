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
import { LoginFormSchema, LoginFormSchemaType } from "@/schema/Login.schema";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: LoginFormSchemaType) {
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password, //both of above can be ...values
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) {
        toast.success("Login Successfully", {
          position: "top-center",
          duration: 4000,
        });
        router.push("/");
      } else {
        toast.error(res?.error || "Failed to login", {
          description: "Please try again toast error",
          position: "top-center",
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error((error as string) || "Something went wrong", {
        position: "top-center",
      });}
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Login to your account to continue
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormMessage className="text-red-500" />
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
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span></span>
              <Link
                href="/forgot-password"
                className="hover:text-blue-500 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}