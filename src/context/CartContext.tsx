"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Cart } from '@/types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'whatbytes-cart';

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    totalItems: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateCartTotals = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, totalItems };
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = prevCart.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...prevCart.items, { product, quantity }];
      }
      
      const { total, totalItems } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        total,
        totalItems
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      const { total, totalItems } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        total,
        totalItems
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      );
      
      const { total, totalItems } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        total,
        totalItems
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      totalItems: 0
    });
  };

  const getCartItemCount = () => cart.totalItems;

  const getCartTotal = () => cart.total;

  const isInCart = (productId: string) => {
    return cart.items.some(item => item.product.id === productId);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemCount,
      getCartTotal,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
}; 