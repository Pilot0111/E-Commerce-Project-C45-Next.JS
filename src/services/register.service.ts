"use server";

import { formStateType, RegisterFormSchema } from "@/schema/Register.schema";

export async function HandelRegister(
  formState: formStateType,
  formData: FormData
): Promise<formStateType> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  };

  const parsedData = RegisterFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      error: parsedData.error?.flatten().fieldErrors,
      success: false,
      message: null,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { error: {}, success: false, message: data.message };
    }
    return { error: {}, success: true, message: data.message };
  } catch (error) {
    return { error: {}, success: false, message: error as string };
  }
}
