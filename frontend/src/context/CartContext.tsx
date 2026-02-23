import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CartContextType {
  cartNumber: number;
  setCartNumber: (value: number) => void;
  cartTotal: number;
  setCartTotal: (value: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // NOTE: Utilize browser storage to persist cart state across page reloads and sessions
  const [cartNumber, setCartNumber] = useState<number>(() => {
    const savedCartNumber = localStorage.getItem("cartNumber");
    return savedCartNumber ? JSON.parse(savedCartNumber) : 0;
  });
  const [cartTotal, setCartTotal] = useState<number>(() => {
    const savedCartTotal = localStorage.getItem("cartTotal");
    return savedCartTotal ? JSON.parse(savedCartTotal) : 0;
  });

  useEffect(() => {
    localStorage.setItem("cartNumber", JSON.stringify(cartNumber));
    localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
  }, [cartNumber, cartTotal]);

  return (
    <CartContext.Provider
      value={{
        cartNumber,
        setCartNumber,
        cartTotal,
        setCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
