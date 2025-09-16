import { ICartResponse } from "@/interfaces/cart.interface";
import { getUserCart } from "@/services/cart.services";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface ICartContext {
  cartDetails: ICartResponse | null;
  setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>>;
  getCartDetails: () => Promise<void>;
}

const CartContext = createContext<ICartContext | null>(null);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null);
const { status } = useSession();
  async function getCartDetails() {
    const { data }: { data: ICartResponse } = await getUserCart();
    setCartDetails(data);
  }

  useEffect(() => {
    getCartDetails();
  }, [ status]);

  return (
    <CartContext.Provider
      value={{ cartDetails, setCartDetails, getCartDetails }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
}
