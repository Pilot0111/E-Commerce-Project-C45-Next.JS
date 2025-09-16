import NextAuth from "next-auth";

declare module "next-auth" {   // Define the User type interface for typescript to use it in the session auth.ts
  interface User {
    user: {
      name: string;
      email: string;
      role: string;
    };
    token: string;
  }

  interface Session {
    user: User.user;
  }
}
