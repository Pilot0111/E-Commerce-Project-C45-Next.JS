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

const ResetPasswordSchema = z.object({
  resetCode: z.string().min(1, { message: "Reset code is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(32, { message: "Password must be at most 32 characters." }),
});

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordPage() {
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      resetCode: "",
      email: "",
      newPassword: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: ResetPasswordSchemaType) {
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successfully", {
          position: "top-center",
          duration: 4000,
        });
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to reset password", {
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
          Reset Password
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter the reset code sent to your email and your new password
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter reset code"
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
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

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Reset Password
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

