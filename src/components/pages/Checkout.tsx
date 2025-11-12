import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft, Trash2, CreditCard, Truck, ShoppingBag } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useCart } from '../CartContext';
import { useOrders } from '../OrderContext';
import { useUser } from '../UserContext';
import { toast } from 'sonner@2.0.3';

export function Checkout() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { currentUser } = useUser();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 449;
  const tax = subtotal * 0.12;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!currentUser) {
      toast.error('Please log in to place an order');
      navigate('/login');
      return;
    }

    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.address || !shippingInfo.city) {
      toast.error('Please fill in all shipping information');
      return;
    }

    if (!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv) {
      toast.error('Please fill in payment information');
      return;
    }

    const trackingNumber = addOrder({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      items: cartItems,
      total,
      status: 'Processing',
      deliveryAddress: `${shippingInfo.address}, ${shippingInfo.city} ${shippingInfo.zipCode}`,
      paymentMethod: `Card ending in ${paymentInfo.cardNumber.slice(-4)}`,
    });

    toast.success(`Order placed successfully! Tracking: ${trackingNumber}`);
    clearCart();
    navigate('/orders');
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
          <h1 className="text-white">Checkout</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          <Card className="p-12 text-center shadow-md">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Add some plants to your cart to get started!
            </p>
            <Button
              onClick={() => navigate('/home')}
              className="bg-green-600 hover:bg-green-700"
            >
              Browse Plants
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="p-6 shadow-md mb-6">
                <h2 className="mb-4">Shopping Cart ({cartItems.length} items)</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {item.seller}</p>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-green-600">₱{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shipping Information */}
            <Card className="p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-green-600" />
                <h2>Shipping Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className="mt-1" 
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className="mt-1" 
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Main St" 
                    className="mt-1" 
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      placeholder="Manila" 
                      className="mt-1" 
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input 
                      id="zipCode" 
                      placeholder="1000" 
                      className="mt-1" 
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-md sticky top-4">
              <h2 className="mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>₱{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (12%)</span>
                  <span>₱{tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-green-600">₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="promoCode">Promo Code</Label>
                <div className="flex gap-2 mt-1">
                  <Input id="promoCode" placeholder="Enter code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <h3>Payment Method</h3>
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="1234 5678 9012 3456" 
                    className="mt-1" 
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY" 
                      className="mt-1" 
                      value={paymentInfo.expiry}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123" 
                      className="mt-1" 
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Place Order
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to our terms and conditions
              </p>
            </Card>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
