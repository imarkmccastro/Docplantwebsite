import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchJson } from '../lib/api';
import { useUser } from './UserContext';

export interface CartItem {
  id: number; // cart item id
  productId: number; // underlying product id
  name: string;
  seller: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { currentUser, token } = useUser();

  const refreshCart = async () => {
    if (!currentUser) {
      setCartItems([]);
      return;
    }
    try {
      const data = await fetchJson<any[]>('/cart', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      console.log('[Cart] Fetched items', data);
      setCartItems(
        data.map(ci => ({
          id: ci.id,
          productId: ci.productId ?? ci.product_id ?? 0,
          name: ci.name,
          seller: ci.seller,
          price: ci.price,
          quantity: ci.quantity,
          image: ci.image,
          category: ci.category,
        }))
      );
    } catch (err) {
      console.warn('[Cart] Failed to fetch cart', err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [currentUser, token]);

  const addToCart = async (productId: number) => {
    if (!currentUser) {
      toast.error('Please log in to add items to your cart');
      return;
    }
    if (!token) {
      toast.error('Authentication token missing. Try logging in again.');
      return;
    }
    try {
      await fetchJson('/cart', { method: 'POST', body: JSON.stringify({ productId }), headers: { Authorization: `Bearer ${token}` } });
      await refreshCart();
    } catch (err: any) {
      console.error('[Cart] addToCart failed', err);
      const msg = err?.message ? String(err.message) : 'server error';
      toast.error(`Could not add item (${msg}).`);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    if (!currentUser || !token) {
      toast.error('Log in to modify your cart');
      return;
    }
    try {
      await fetchJson(`/cart/${cartItemId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      await refreshCart();
    } catch (err: any) {
      console.error('[Cart] removeFromCart failed', err);
      toast.error('Failed to remove item.');
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (!currentUser || !token) {
      toast.error('Log in to update quantities');
      return;
    }
    try {
      await fetchJson(`/cart/${cartItemId}`, { method: 'PATCH', body: JSON.stringify({ quantity }), headers: { Authorization: `Bearer ${token}` } });
      await refreshCart();
    } catch (err: any) {
      console.error('[Cart] updateQuantity failed', err);
      toast.error('Failed to update quantity.');
    }
  };

  const clearCart = async () => {
    if (!currentUser || !token) {
      toast.error('Log in to clear your cart');
      return;
    }
    try {
      await Promise.all(cartItems.map(ci => fetchJson(`/cart/${ci.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }).catch(() => null)));
      await refreshCart();
    } catch (err: any) {
      console.error('[Cart] clearCart failed', err);
      toast.error('Failed to clear cart.');
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}