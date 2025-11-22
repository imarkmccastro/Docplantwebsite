import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useOrders } from '../OrderContext';
import { useUser } from '../UserContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { EcoBackground } from '../EcoBackground';
import { motion } from 'framer-motion';

export function OrderTracking() {
  const navigate = useNavigate();
  const { getUserOrders } = useOrders();
  const { currentUser } = useUser();

  const userOrders = currentUser ? getUserOrders(currentUser.id) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Package className="w-5 h-5" />;
      case 'Shipped':
        return <Truck className="w-5 h-5" />;
      case 'Delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'Cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen relative pb-20 overflow-hidden">
      <EcoBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/40 border-b border-white/30 px-4 py-6 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/home')}
                className="text-emerald-600 hover:bg-emerald-50 mb-4 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Shop
              </Button>
            </motion.div>
            <h1 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-1">Order Tracking</h1>
            <p className="text-gray-600">Track your plant deliveries</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {!currentUser ? (
            <Card className="p-8 text-center backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg">
              <Package className="w-16 h-16 mx-auto text-emerald-400 mb-4" />
              <h2 className="mb-2 text-gray-800">Please Log In</h2>
              <p className="text-gray-600 mb-4">
                You need to be logged in to view your orders
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl">
                  Go to Login
                </Button>
              </motion.div>
            </Card>
          ) : userOrders.length === 0 ? (
            <Card className="p-8 text-center backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg">
              <Package className="w-16 h-16 mx-auto text-emerald-400 mb-4" />
              <h2 className="mb-2 text-gray-800">No Orders Yet</h2>
              <p className="text-gray-600 mb-4">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => navigate('/home')} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl">
                  Start Shopping
                </Button>
              </motion.div>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-700">Your Orders ({userOrders.length})</h2>
              </div>

              {userOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg hover:shadow-xl hover:shadow-emerald-100/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-gray-800">Order #{order.id}</h3>
                          <Badge className={`${getStatusColor(order.status)} rounded-full`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-2">{order.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Tracking: <span className="font-mono">{order.trackingNumber}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Total</p>
                        <p className="text-emerald-600">₱{order.total.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4 border-t border-white/60 pt-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/60">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="mb-1 text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="text-gray-700">₱{item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info */}
                    <div className="border-t border-white/60 pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Delivery Address</p>
                          <p className="text-gray-900">{order.deliveryAddress}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Payment Method</p>
                          <p className="text-gray-900">{order.paymentMethod}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="border-t border-white/60 pt-4 mt-4">
                      <p className="text-sm mb-3 text-gray-700">Order Progress</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center flex-1">
                          <motion.div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered'
                                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-200'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                          >
                            <Package className="w-5 h-5" />
                          </motion.div>
                          <p className="text-xs mt-2 text-gray-600">Processing</p>
                        </div>
                        <div className={`flex-1 h-1 ${
                          order.status === 'Shipped' || order.status === 'Delivered'
                            ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                            : 'bg-gray-200'
                        }`} />
                        <div className="flex flex-col items-center flex-1">
                          <motion.div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              order.status === 'Shipped' || order.status === 'Delivered'
                                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-200'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Truck className="w-5 h-5" />
                          </motion.div>
                          <p className="text-xs mt-2 text-gray-600">Shipped</p>
                        </div>
                        <div className={`flex-1 h-1 ${
                          order.status === 'Delivered'
                            ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                            : 'bg-gray-200'
                        }`} />
                        <div className="flex flex-col items-center flex-1">
                          <motion.div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              order.status === 'Delivered'
                                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-200'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </motion.div>
                          <p className="text-xs mt-2 text-gray-600">Delivered</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}