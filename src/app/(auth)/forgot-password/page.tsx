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
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: ForgotPasswordSchemaType) {
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Reset code sent to your email", {
          position: "top-center",
          duration: 4000,
        });
        router.push("/reset-password");
      } else {
        toast.error(data.message || "Failed to send reset code", {
          position: "top-center",
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error(error as string || "Something went wrong. Please try again.", {
        position: "top-center",
        duration: 4000,
      });

    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter your email address and we will send you a reset code
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

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Send Reset Code
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}

