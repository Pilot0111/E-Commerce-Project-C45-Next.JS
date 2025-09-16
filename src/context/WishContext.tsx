"use client";
import { IwishResponse } from "@/interfaces/wish.interface";
import { getWishCart } from "@/services/wish.services";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface IWishContext {
  wishDetails: IwishResponse | null;
  setWishDetails: React.Dispatch<React.SetStateAction<IwishResponse | null>>;
  getWishDetails: () => Promise<void>;
}

const WishContext = createContext<IWishContext | null>(null);

export function WishContextProvider({ children }: { children: React.ReactNode }) {
  const [wishDetails, setWishDetails] = useState<IwishResponse | null>(null);
const { status } = useSession();
  async function getWishDetails() {
    const data = await getWishCart();
    setWishDetails(data);
  }

  useEffect(() => {
    getWishDetails();
  }, [status]);

  return (
    <WishContext.Provider value={{ wishDetails, setWishDetails, getWishDetails }}>
      {children}
    </WishContext.Provider>
  );
}

export function useWish() {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error("useWish must be used within a WishContextProvider");
  }
  return context;
}
