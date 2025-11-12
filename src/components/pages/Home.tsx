import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Search, ShoppingCart, Star, Filter } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import { useCart } from '../CartContext';
import { toast } from 'sonner@2.0.3';

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [allPlants] = useState([
    {
      id: 1,
      name: 'Monstera Deliciosa',
      price: 2299,
      rating: 4.8,
      seller: 'Green Gardens',
      image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Tropical',
    },
    {
      id: 2,
      name: 'Succulent Collection',
      price: 1499,
      rating: 4.9,
      seller: 'Desert Blooms',
      image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Succulents',
    },
    {
      id: 3,
      name: 'Indoor Plant Bundle',
      price: 4499,
      rating: 4.7,
      seller: 'Urban Jungle',
      image: 'https://images.unsplash.com/photo-1615420733059-0d97cf9ed9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMGluZG9vcnxlbnwxfHx8fDE3NjI2NTg1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Indoor',
    },
    {
      id: 4,
      name: 'Potted Plants Mix',
      price: 2649,
      rating: 4.6,
      seller: 'Plant Paradise',
      image: 'https://images.unsplash.com/photo-1598838073192-05c942ede858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudCUyMHN0b3JlfGVufDF8fHx8MTc2MjY1ODUzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Indoor',
    },
    {
      id: 5,
      name: 'Bird of Paradise',
      price: 3299,
      rating: 4.9,
      seller: 'Green Gardens',
      image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Tropical',
    },
    {
      id: 6,
      name: 'Snake Plant',
      price: 1799,
      rating: 4.7,
      seller: 'Urban Jungle',
      image: 'https://images.unsplash.com/photo-1615420733059-0d97cf9ed9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMGluZG9vcnxlbnwxfHx8fDE3NjI2NTg1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Low Light',
    },
    {
      id: 7,
      name: 'Jade Plant',
      price: 1249,
      rating: 4.8,
      seller: 'Desert Blooms',
      image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Succulents',
    },
    {
      id: 8,
      name: 'Lavender Plant',
      price: 1449,
      rating: 4.6,
      seller: 'Garden Delights',
      image: 'https://images.unsplash.com/photo-1598838073192-05c942ede858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudCUyMHN0b3JlfGVufDF8fHx8MTc2MjY1ODUzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Outdoor',
    },
  ]);

  const [categories] = useState([
    { name: 'Tropical', count: 45 },
    { name: 'Succulents', count: 32 },
    { name: 'Indoor', count: 67 },
    { name: 'Outdoor', count: 54 },
    { name: 'Low Light', count: 28 },
  ]);

  // Filter plants based on selected category
  const featuredPlants = selectedCategory
    ? allPlants.filter(plant => plant.category === selectedCategory)
    : allPlants;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-white mb-1">Doc Plant</h1>
              <p className="text-green-100">Marketplace</p>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="relative p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for plants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2>Categories</h2>
            {selectedCategory && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-green-600 hover:text-green-700"
              >
                Clear Filter
              </Button>
            )}
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge
              onClick={() => setSelectedCategory(null)}
              variant="secondary"
              className={`px-4 py-2 cursor-pointer whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-white hover:bg-green-50 text-gray-700'
              }`}
            >
              All
            </Badge>
            {categories.map((category, index) => (
              <Badge
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                variant="secondary"
                className={`px-4 py-2 cursor-pointer whitespace-nowrap transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-white hover:bg-green-50 text-gray-700'
                }`}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Seasonal Collection Banner */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-green-100 to-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-green-800 mb-2">🌿 Fall Collection 2025</h2>
              <p className="text-green-700 mb-4">
                Discover our curated selection of seasonal plants
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                Explore Collection
              </Button>
            </div>
          </div>
        </Card>

        {/* Featured Plants */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2>
              {selectedCategory ? `${selectedCategory} Plants` : 'Featured Plants'}
            </h2>
            <span className="text-sm text-gray-600">
              {featuredPlants.length} {featuredPlants.length === 1 ? 'plant' : 'plants'}
            </span>
          </div>
          
          {featuredPlants.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-600">No plants found in this category</p>
              <Button 
                onClick={() => setSelectedCategory(null)}
                className="mt-4 bg-green-600 hover:bg-green-700"
              >
                View All Plants
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredPlants.map((plant) => (
              <Card
                key={plant.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative overflow-hidden">
                  <ImageWithFallback
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <Badge className="absolute top-2 right-2 bg-white text-gray-700">
                    {plant.category}
                  </Badge>
                </div>
                
                <div className="p-4">
                  <h3 className="mb-1">{plant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{plant.seller}</p>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-700">{plant.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-green-600">₱{plant.price.toLocaleString()}</span>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: plant.id,
                          name: plant.name,
                          seller: plant.seller,
                          price: plant.price,
                          image: plant.image,
                          category: plant.category,
                        });
                        toast.success(`${plant.name} added to cart!`);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Section */}
        <div>
          <h2 className="mb-4">Recommended For You</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredPlants.slice(0, 2).map((plant) => (
              <Card
                key={`rec-${plant.id}`}
                className="flex gap-4 p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="mb-1">{plant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{plant.seller}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600">₱{plant.price.toLocaleString()}</span>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
