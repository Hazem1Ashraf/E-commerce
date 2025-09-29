"use client";
import getLoggedUserCart from "@/CartAction/getUserCart.action";
import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface CartContextType {
  numberOfCartitem: number;
  setnumberOfCartitem: Dispatch<SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfCartitem, setnumberOfCartitem] = useState<number>(0);

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setnumberOfCartitem(sum);
      }
    } catch {
      toast.error("please Login first To can See Your Cart 😍", { duration: 2000 ,position:"top-center"}); 
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartitem, setnumberOfCartitem }}>
      {children}
    </CartContext.Provider>
  );
}
