"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  image?: string;
  listingType?: "rental" | "sale";
  quantity: number;
};

type AddCartItem = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  /** false until the cart has been read from localStorage (avoids flashing "empty cart"). */
  ready: boolean;
  totalItems: number;
  addItem: (item: AddCartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = "clamp-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  // El carrito vive en localStorage. Se carga después de montar (no en el render inicial)
  // para que el HTML del servidor y el primer render del cliente coincidan.
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from localStorage after hydration
      if (Array.isArray(parsedCart) && parsedCart.length > 0) setItems(parsedCart);
    } catch {
      console.error("Unable to load cart");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private mode / storage full: the cart still works for this visit.
    }
  }, [items, loaded]);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const addItem = (item: AddCartItem) => {
    const quantity = Math.max(1, item.quantity || 1);

    setItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return [...currentItems, { ...item, quantity }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    const nextQuantity = Math.max(0, quantity);

    setItems((currentItems) =>
      nextQuantity === 0
        ? currentItems.filter((item) => item.id !== id)
        : currentItems.map((item) =>
            item.id === id ? { ...item, quantity: nextQuantity } : item
          )
    );
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, ready: loaded, totalItems, addItem, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
