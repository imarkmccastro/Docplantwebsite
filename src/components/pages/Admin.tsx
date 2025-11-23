import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft, Edit, Trash2, Plus, Save, X, Users, Package, TrendingUp } from 'lucide-react';
import { useProducts } from '../ProductContext';
import { useUser } from '../UserContext';
import { useOrders } from '../OrderContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function Admin() {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { users } = useUser();
  const { orders, updateOrderStatus } = useOrders();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    seller: '',
    category: '',
    rating: '',
    image: '',
  });

  const [newProductForm, setNewProductForm] = useState({
    name: '',
    price: '',
    seller: '',
    category: 'Tropical',
    rating: '4.5',
    image: '',
  });

  const categories = ['Tropical', 'Succulents', 'Indoor', 'Outdoor', 'Low Light'];

  const handleEdit = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditingId(productId);
      setEditForm({
        name: product.name,
        price: product.price.toString(),
        seller: product.seller,
        category: product.category,
        rating: product.rating.toString(),
        image: product.image,
      });
    }
  };

  const handleSave = (productId: number) => {
    updateProduct(productId, {
      name: editForm.name,
      price: parseFloat(editForm.price),
      seller: editForm.seller,
      category: editForm.category,
      rating: parseFloat(editForm.rating),
      image: editForm.image,
    });
    setEditingId(null);
    toast.success('Product updated successfully!');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      name: '',
      price: '',
      seller: '',
      category: '',
      rating: '',
      image: '',
    });
  };

  const handleDelete = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      toast.success('Product deleted successfully!');
    }
  };

  const handleAddProduct = () => {
    if (!newProductForm.name || !newProductForm.price || !newProductForm.seller || !newProductForm.image) {
      toast.error('Please fill in all required fields');
      return;
    }

    addProduct({
      name: newProductForm.name,
      price: parseFloat(newProductForm.price),
      seller: newProductForm.seller,
      category: newProductForm.category,
      rating: parseFloat(newProductForm.rating),
      image: newProductForm.image,
    });

    setNewProductForm({
      name: '',
      price: '',
      seller: '',
      category: 'Tropical',
      rating: '4.5',
      image: '',
    });
    setIsAddDialogOpen(false);
    toast.success('Product added successfully!');
  };

  const handleOrderStatusChange = (orderId: number, status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled') => {
    updateOrderStatus(orderId, status);
    toast.success('Order status updated!');
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Shop
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white mb-1">Admin Dashboard</h1>
              <p className="text-green-100">Manage Products, Users & Orders</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-green-600 hover:bg-green-50">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="new-name">Product Name *</Label>
                    <Input
                      id="new-name"
                      value={newProductForm.name}
                      onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                      placeholder="e.g., Monstera Deliciosa"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-price">Price (₱) *</Label>
                      <Input
                        id="new-price"
                        type="number"
                        value={newProductForm.price}
                        onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                        placeholder="2299"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-rating">Rating</Label>
                      <Input
                        id="new-rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={newProductForm.rating}
                        onChange={(e) => setNewProductForm({ ...newProductForm, rating: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="new-seller">Seller *</Label>
                    <Input
                      id="new-seller"
                      value={newProductForm.seller}
                      onChange={(e) => setNewProductForm({ ...newProductForm, seller: e.target.value })}
                      placeholder="e.g., Green Gardens"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-category">Category</Label>
                    <Select
                      value={newProductForm.category}
                      onValueChange={(value: string) => setNewProductForm({ ...newProductForm, category: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="new-image">Image URL *</Label>
                    <Input
                      id="new-image"
                      value={newProductForm.image}
                      onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use Unsplash or other image URLs
                    </p>
                  </div>
                  {newProductForm.image && (
                    <div>
                      <Label>Preview</Label>
                      <div className="mt-1 w-full h-48 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={newProductForm.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleAddProduct}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Add Product
                    </Button>
                    <Button
                      onClick={() => setIsAddDialogOpen(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <h3>{users.length}</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <h3>{orders.length}</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <h3>{products.length}</h3>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="mb-4">
              <h2 className="mb-2">Products ({products.length})</h2>
              <p className="text-gray-600">
                Edit product details or adjust prices below
              </p>
            </div>
            {products.map((product) => (
              <Card key={product.id} className="p-4">
                {editingId === product.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={editForm.image || product.image}
                          alt={editForm.name || product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`edit-name-${product.id}`}>Product Name</Label>
                            <Input
                              id={`edit-name-${product.id}`}
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-seller-${product.id}`}>Seller</Label>
                            <Input
                              id={`edit-seller-${product.id}`}
                              value={editForm.seller}
                              onChange={(e) => setEditForm({ ...editForm, seller: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <Label htmlFor={`edit-price-${product.id}`}>Price (₱)</Label>
                            <Input
                              id={`edit-price-${product.id}`}
                              type="number"
                              value={editForm.price}
                              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-rating-${product.id}`}>Rating</Label>
                            <Input
                              id={`edit-rating-${product.id}`}
                              type="number"
                              step="0.1"
                              min="0"
                              max="5"
                              value={editForm.rating}
                              onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-category-${product.id}`}>Category</Label>
                            <Select
                              value={editForm.category}
                              onValueChange={(value: string) => setEditForm({ ...editForm, category: value })}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`edit-image-${product.id}`}>Image URL</Label>
                          <Input
                            id={`edit-image-${product.id}`}
                            value={editForm.image}
                            onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-2 border-t">
                      <Button
                        size="sm"
                        onClick={() => handleSave(product.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {product.seller}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-600">₱{product.price.toLocaleString()}</span>
                        <span className="text-gray-600">⭐ {product.rating}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(product.id)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="mb-4">
              <h2 className="mb-2">Registered Users ({users.length})</h2>
              <p className="text-gray-600">
                View all registered user accounts
              </p>
            </div>
            {users.map((user) => (
              <Card key={user.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1">{user.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      Joined: {formatDate(user.createdAt)}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    User ID: {user.id}
                  </Badge>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <div className="mb-4">
              <h2 className="mb-2">All Orders ({orders.length})</h2>
              <p className="text-gray-600">
                Manage and track all customer orders
              </p>
            </div>
            {orders.length === 0 ? (
              <Card className="p-8 text-center">
                <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="mb-2">No Orders Yet</h3>
                <p className="text-gray-600">
                  Orders will appear here once customers make purchases
                </p>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3>Order #{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Customer: {order.userName} ({order.userEmail})
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Placed: {formatDate(order.createdAt)}
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
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-gray-700">₱{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-600 mb-1">Delivery Address</p>
                        <p className="text-gray-900">{order.deliveryAddress}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Payment Method</p>
                        <p className="text-gray-900">{order.paymentMethod}</p>
                      </div>
                    </div>

                    {/* Status Update */}
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`status-${order.id}`}>Update Status:</Label>
                      <Select
                        value={order.status}
                        onValueChange={(value: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled') => 
                          handleOrderStatusChange(order.id, value)
                        }
                      >
                        <SelectTrigger id={`status-${order.id}`} className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
