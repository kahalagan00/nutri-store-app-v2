import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the context value type
interface CartContextType {
  cartNumber: number;
  setCartNumber: (value: number) => void;
  cartTotal: number;
  setCartTotal: (value: number) => void;
}

// Create the context with an initial value of `undefined`
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
      value={{ cartNumber, setCartNumber, cartTotal, setCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for consuming the context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
