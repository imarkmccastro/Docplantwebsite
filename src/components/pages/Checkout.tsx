import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft, Trash2, CreditCard, Truck, ShoppingBag, Sparkles } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useCart } from '../CartContext';
import { useOrders } from '../OrderContext';
import { useUser } from '../UserContext';
import { toast } from 'sonner@2.0.3';
import { EcoBackground } from '../EcoBackground';
import { motion } from 'motion/react';

export function Checkout() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { currentUser } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleCheckout = async () => {
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

    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

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

    toast.success(`Order placed successfully! 🌿 Tracking: ${trackingNumber}`);
    clearCart();
    setIsProcessing(false);
    navigate('/orders');
  };

  return (
    <div className="min-h-screen relative pb-20 overflow-hidden">
      <EcoBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/40 border-b border-white/30 px-4 sm:px-6 py-6 sm:py-8 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/home')}
                className="text-gray-700 hover:bg-white/60 rounded-xl mb-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Shop
              </Button>
            </motion.div>
            <h1 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Checkout</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-12 text-center backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-xl">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
                <h2 className="mb-2 text-gray-800">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">
                  Add some plants to your cart to get started!
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => navigate('/home')}
                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50"
                  >
                    Browse Plants
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-emerald-500" />
                      <h2 className="text-gray-700">Shopping Cart ({cartItems.length} items)</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-white/40 last:border-b-0">
                          <div 
                            className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/60 cursor-pointer hover:border-emerald-300 transition-all"
                            onClick={() => navigate(`/plant/${item.id}`)}
                          >
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 
                              className="mb-1 text-gray-800 cursor-pointer hover:text-emerald-600 transition-colors"
                              onClick={() => navigate(`/plant/${item.id}`)}
                            >
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">by {item.seller}</p>
                            
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 border-2 border-white/60 rounded-xl backdrop-blur-sm bg-white/50">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="px-3 py-1 hover:bg-emerald-50 rounded-l-xl transition-colors"
                                >
                                  -
                                </button>
                                <span className="px-2 text-gray-700">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="px-3 py-1 hover:bg-emerald-50 rounded-r-xl transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-emerald-600 font-medium">₱{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                {/* Shipping Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Truck className="w-5 h-5 text-emerald-600" />
                      <h2 className="text-gray-700">Shipping Information</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                          <Input 
                            id="firstName" 
                            placeholder="John" 
                            className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" 
                            value={shippingInfo.firstName}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Doe" 
                            className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" 
                            value={shippingInfo.lastName}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address" className="text-gray-700">Address</Label>
                        <Input 
                          id="address" 
                          placeholder="123 Main St" 
                          className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" 
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city" className="text-gray-700">City</Label>
                          <Input 
                            id="city" 
                            placeholder="Manila" 
                            className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" 
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode" className="text-gray-700">Zip Code</Label>
                          <Input 
                            id="zipCode" 
                            placeholder="1000" 
                            className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" 
                            value={shippingInfo.zipCode}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg sticky top-4">
                    <h2 className="mb-4 text-gray-700">Order Summary</h2>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₱{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>₱{shipping.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax (12%)</span>
                        <span>₱{tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      
                      <Separator className="bg-white/40" />
                      
                      <div className="flex justify-between text-gray-800 font-medium">
                        <span>Total</span>
                        <span className="text-emerald-600">₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="promoCode" className="text-gray-700">Promo Code</Label>
                      <div className="flex gap-2 mt-1">
                        <Input id="promoCode" placeholder="Enter code" className="bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" />
                        <Button variant="outline" className="border-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-xl">Apply</Button>
                      </div>
                    </div>

                    <Separator className="my-4 bg-white/40" />

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-gray-700">Payment Method</h3>
                      </div>
                      
                      <div>
                        <Label htmlFor="cardNumber" className="text-gray-700">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" 
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <Label htmlFor="expiry" className="text-gray-700">Expiry</Label>
                          <Input 
                            id="expiry" 
                            placeholder="MM/YY" 
                            className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" 
                            value={paymentInfo.expiry}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-gray-700">CVV</Label>
                          <Input 
                            id="cvv" 
                            placeholder="123" 
                            className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" 
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Place Order'}
                      </Button>
                    </motion.div>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      By placing this order, you agree to our terms and conditions
                    </p>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}