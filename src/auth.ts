import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "username@domain.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}auth/signin`,

            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
          const data = await response.json();
          const decodedToken =JSON.parse( atob(data.token.split(".")[1]))
          if (!response.ok) {
            throw new Error(data.message || "Failed to login");
          } else {
            return {
              id: decodedToken.id,
              user: data.user,
              token: data.token,
            };
          }
        } catch (error) {
          throw new Error((error as Error).message || "Failed to login");
        }
      },
    }),
  ],

callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.user = user.user;
      token.token = user.token;
      token.id = user.id;
    }
    return token;
  },    
  async session({ session, token }) {
    if (token) {
      session.user= token.user;
      session.user.id = token.id;
    }
    return session;         
  },
},
  pages: {
    signIn: "/login",
  },
};
