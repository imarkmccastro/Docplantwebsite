import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'trackingNumber'>) => string;
  updateOrderStatus: (orderId: number, status: Order['status']) => void;
  getUserOrders: (userId: number) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Load orders from localStorage
const loadOrders = (): Order[] => {
  try {
    const storedOrders = localStorage.getItem('docplant_orders');
    if (storedOrders) {
      return JSON.parse(storedOrders);
    }
  } catch (error) {
    console.error('Error loading orders from localStorage:', error);
  }
  return [];
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('docplant_orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }, [orders]);

  const generateTrackingNumber = (): string => {
    const prefix = 'DP';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const addOrder = (order: Omit<Order, 'id' | 'createdAt' | 'trackingNumber'>): string => {
    const trackingNumber = generateTrackingNumber();
    const newOrder: Order = {
      ...order,
      id: Math.max(...orders.map(o => o.id), 0) + 1,
      createdAt: new Date().toISOString(),
      trackingNumber,
    };
    setOrders([...orders, newOrder]);
    return trackingNumber;
  };

  const updateOrderStatus = (orderId: number, status: Order['status']) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status } : o
    ));
  };

  const getUserOrders = (userId: number): Order[] => {
    return orders.filter(o => o.userId === userId).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getUserOrders }}>
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
