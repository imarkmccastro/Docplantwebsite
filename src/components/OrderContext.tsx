import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchJson } from '../lib/api';
import { useUser } from './UserContext';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  userId: number;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  deliveryAddress: string;
  paymentMethod: string;
  trackingNumber: string;
}

interface OrderContextType {
  orders: Order[]; // Admin: all orders; Regular user: own orders
  placeOrder: (deliveryAddress: string, paymentMethod: string) => Promise<Order | null>;
  updateOrderStatus: (orderId: number, status: Order['status']) => Promise<boolean>;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Load orders from localStorage
export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { currentUser } = useUser();

  const refreshOrders = async () => {
    if (!currentUser) {
      setOrders([]);
      return;
    }
    try {
      if (currentUser.email === 'admin@docplant.com') {
        const data = await fetchJson<Order[]>('/orders');
        setOrders(data);
      } else {
        const data = await fetchJson<Order[]>('/orders/my');
        setOrders(data);
      }
    } catch {
      setOrders([]);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, [currentUser]);

  const placeOrder = async (deliveryAddress: string, paymentMethod: string): Promise<Order | null> => {
    if (!currentUser) return null;
    try {
      const order = await fetchJson<Order>('/orders', {
        method: 'POST',
        body: JSON.stringify({ deliveryAddress, paymentMethod }),
      });
      await refreshOrders();
      return order;
    } catch (e) {
      return null;
    }
  };

  const updateOrderStatus = async (orderId: number, status: Order['status']): Promise<boolean> => {
    if (!currentUser || currentUser.email !== 'admin@docplant.com') return false;
    try {
      await fetchJson(`/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      await refreshOrders();
      return true;
    } catch {
      return false;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, refreshOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
