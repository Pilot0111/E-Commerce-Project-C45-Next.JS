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
import { getUserToken } from "@/lib/serverUtility";

const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Current password must be at least 6 characters." }),
    password: z
      .string()
      .min(6, { message: "New password must be at least 6 characters." })
      .max(32, { message: "New password must be at most 32 characters." }),
    rePassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;

export default function ChangePasswordPage() {
  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  async function onSubmit(values: ChangePasswordSchemaType) {
    try {
        const token = await getUserToken();
      
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token as string,
          },
          body: JSON.stringify({
            currentPassword: values.currentPassword,
            password: values.password,
            rePassword: values.rePassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Password changed successfully", {
          position: "top-center",
          duration: 4000,
        });
        form.reset();
      } else {
        toast.error(data.message || "Failed to change password", {
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
    <section className="py-20">
      <div className="container mx-auto max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Change Password
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Update your account password
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
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

              <FormField
                control={form.control}
                name="password"
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

              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
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
                Change Password
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
