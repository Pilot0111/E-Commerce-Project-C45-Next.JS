import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieName= process.env.NODE_ENV === "production"
? "__Secure-next-auth.session-token" : "next-auth.session-token";
 const token = await getToken({ req: request, cookieName });
  const { pathname } = request.nextUrl;

  const AuthRoute = ["/login", "/register"];
  const ProtectedRoute = ["/cart", "/checkout", "/profile"];

  // Case 1: Guest tries to access protected route → redirect to login
  if (!token && ProtectedRoute.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Case 2: Logged-in user tries to access login/register → redirect to home
  if (token && AuthRoute.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Otherwise → allow access
  return NextResponse.next();
}

// Apply middleware to all relevant routes
export const config = {
  matcher: ["/cart", "/checkout", "/profile", "/login", "/register"],
};




// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const { pathname } = request.nextUrl;
//   const isAuthPage = pathname === "/login" || pathname === "/register";
//   const isProtectedRoute = pathname === "/cart";

//   // 1. If NO token (guest)
//   if (!token) {
//     // Allow access to login/register pages
//     if (isAuthPage) {
//       return NextResponse.next();
//     }
//     // Block all protected routes → redirect to login
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // 2. If YES token (authenticated)
//   if (isAuthPage) {
//     // Already logged in → send them home
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // 3. Default: allow access
//   return NextResponse.next();
// }

// // Apply middleware only on these routes
// export const config = {
//   matcher: ["/cart", "/login", "/register"],
// };


