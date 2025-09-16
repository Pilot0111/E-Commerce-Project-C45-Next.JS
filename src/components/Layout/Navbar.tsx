"use client";

import {
  Heart,
  MenuIcon,
  ShoppingCart,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { useCart } from "@/context/CartContext";
import { useWish } from "@/context/WishContext";

const Navbar = () => {
  const Links = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/categories", label: "Categories" },
    { path: "/brands", label: "Brands" },
  ];

  const pathname = usePathname();
  const { status } = useSession();
  const { cartDetails } = useCart();
  const { wishDetails } = useWish();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              NextCart
            </span>
          </Link>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {Links.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "px-4 py-2 text-sm font-medium transition rounded-md",
                      pathname === link.path
                        ? "bg-blue-100 text-blue-600 shadow-sm"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-4 lg:flex">
            {status === "loading" ? (
              <span>Loading... </span>
            ) : status === "unauthenticated" ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* Wishlist */}
                <Link href="/wishlist" className="relative hover:opacity-80">
                  {wishDetails && (
                    <Badge
                      className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono text-xs"
                      variant="destructive"
                    >
                      {wishDetails?.count}
                    </Badge>
                  )}
                  <Heart className="w-6 h-6" />
                </Link>

                <Link href="/cart" className="relative hover:opacity-80">
                  {cartDetails && (
                    <Badge
                      className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono text-xs"
                      variant="destructive"
                    >
                      {cartDetails?.numOfCartItems}
                    </Badge>
                  )}
                  <ShoppingCart className="w-6 h-6" />
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <User className="w-7 h-7 hover:text-blue-600 transition" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/allorders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/change-password">Change Password</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="text-xl font-extrabold tracking-tight">
                    NextCart
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {Links.map((link, index) => (
                  <Link
                    href={link.path}
                    key={index}
                    className={cn(
                      "px-3 py-2 rounded-md font-medium transition",
                      pathname === link.path
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-6 flex flex-col gap-3">
                  {status === "unauthenticated" ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign up</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/wishlist" className="flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        Wishlist
                        {wishDetails && (
                          <Badge variant="destructive" className="ml-auto">
                            {wishDetails?.count}
                          </Badge>
                        )}
                      </Link>
                      <Link href="/cart" className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Cart
                        {cartDetails && (
                          <Badge variant="destructive" className="ml-auto">
                            {cartDetails?.numOfCartItems}
                          </Badge>
                        )}
                      </Link>
                      <Link href="/profile" className="flex items-center gap-2">
                        <User className="w-5 h-5" /> Profile
                      </Link>
                      <Button
                        variant="destructive"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                      >
                        Sign Out
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
