"use server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getUserToken() {
  const cookieStore = await cookies();

  const encodedToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;
  const decodedToken = await decode({
    token: encodedToken,
    secret: process.env.AUTH_SECRET!,
  });
  console.log("this is the decoded token", decodedToken!.token);
  return decodedToken!.token;
}
