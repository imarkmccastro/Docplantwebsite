import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useOrders } from '../OrderContext';
import { useUser } from '../UserContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Shop
          </Button>
          <h1 className="text-white mb-1">Order Tracking</h1>
          <p className="text-green-100">Track your plant deliveries</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {!currentUser ? (
          <Card className="p-8 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="mb-2">Please Log In</h2>
            <p className="text-gray-600 mb-4">
              You need to be logged in to view your orders
            </p>
            <Button onClick={() => navigate('/login')} className="bg-green-600 hover:bg-green-700">
              Go to Login
            </Button>
          </Card>
        ) : userOrders.length === 0 ? (
          <Card className="p-8 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-4">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Button onClick={() => navigate('/home')} className="bg-green-600 hover:bg-green-700">
              Start Shopping
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2>Your Orders ({userOrders.length})</h2>
            </div>

            {userOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3>Order #{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
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
                    <p className="text-green-600">₱{order.total.toLocaleString()}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4 border-t pt-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="mb-1">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-gray-700">₱{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Delivery Info */}
                <div className="border-t pt-4">
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
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm mb-3">Order Progress</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Package className="w-5 h-5" />
                      </div>
                      <p className="text-xs mt-2">Processing</p>
                    </div>
                    <div className={`flex-1 h-1 ${
                      order.status === 'Shipped' || order.status === 'Delivered'
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`} />
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        order.status === 'Shipped' || order.status === 'Delivered'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Truck className="w-5 h-5" />
                      </div>
                      <p className="text-xs mt-2">Shipped</p>
                    </div>
                    <div className={`flex-1 h-1 ${
                      order.status === 'Delivered'
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`} />
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        order.status === 'Delivered'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <p className="text-xs mt-2">Delivered</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
