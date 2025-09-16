"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { CartContextProvider } from "./context/CartContext";
import { WishContextProvider } from "./context/WishContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishContextProvider>{children}</WishContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
