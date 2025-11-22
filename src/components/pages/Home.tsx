import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Search, ShoppingCart, Star, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import { useCart } from '../CartContext';
import { useProducts } from '../ProductContext';
import { toast } from 'sonner@2.0.3';
import { EcoBackground } from '../EcoBackground';
import { motion } from 'motion/react';

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, addToCart } = useCart();
  const { products: allPlants } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [categories] = useState([
    { name: 'Tropical', count: 6 },
    { name: 'Succulents', count: 7 },
    { name: 'Indoor', count: 8 },
    { name: 'Outdoor', count: 8 },
    { name: 'Low Light', count: 6 },
  ]);

  // Filter plants based on selected category and search query
  const featuredPlants = allPlants.filter(plant => {
    const matchesCategory = selectedCategory ? plant.category === selectedCategory : true;
    const matchesSearch = searchQuery.trim() ? 
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.category.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen relative pb-20 overflow-hidden">
      <EcoBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/40 border-b border-white/30 px-4 sm:px-6 py-6 sm:py-8 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h1 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-1">Doc Plant</h1>
                <p className="text-gray-600">Marketplace</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/checkout')}
                className="relative p-3 backdrop-blur-xl bg-white/60 rounded-2xl hover:bg-white/80 transition-all duration-300 border-2 border-white/60 hover:border-emerald-300 shadow-lg"
              >
                <ShoppingCart className="w-6 h-6 text-emerald-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-xs text-white shadow-lg">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <Input
                type="text"
                placeholder="Search for plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl h-12 shadow-sm focus:shadow-lg focus:shadow-emerald-100 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Categories */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-gray-700">Categories</h2>
              {selectedCategory && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="text-emerald-600 hover:text-green-600 hover:bg-emerald-50"
                >
                  Clear Filter
                </Button>
              )}
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge
                onClick={() => setSelectedCategory(null)}
                variant="secondary"
                className={`px-4 py-2 cursor-pointer whitespace-nowrap transition-all duration-300 rounded-full ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-lg shadow-emerald-200'
                    : 'bg-white/70 hover:bg-white/90 text-gray-700 border border-white/60'
                }`}
              >
                All
              </Badge>
              {categories.map((category, index) => (
                <Badge
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  variant="secondary"
                  className={`px-4 py-2 cursor-pointer whitespace-nowrap transition-all duration-300 rounded-full ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-lg shadow-emerald-200'
                      : 'bg-white/70 hover:bg-white/90 text-gray-700 border border-white/60'
                  }`}
                >
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>
          </div>

          {/* Seasonal Collection Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="p-6 backdrop-blur-xl bg-gradient-to-r from-emerald-50/80 to-green-50/80 border-2 border-white/60 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    <h2 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      Fall Collection 2025
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Discover our curated selection of seasonal plants
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50">
                      Explore Collection
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Featured Plants */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-700">
                {selectedCategory ? `${selectedCategory} Plants` : 'Featured Plants'}
              </h2>
              <span className="text-sm text-gray-500">
                {featuredPlants.length} {featuredPlants.length === 1 ? 'plant' : 'plants'}
              </span>
            </div>
            
            {featuredPlants.length === 0 ? (
              <Card className="p-12 text-center backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl">
                <p className="text-gray-600">
                  {searchQuery ? `No plants found matching "${searchQuery}"` : 'No plants found in this category'}
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery('');
                    }}
                    className="mt-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl"
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {featuredPlants.map((plant, index) => (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    className="overflow-hidden cursor-pointer backdrop-blur-xl bg-white/70 border-2 border-white/60 hover:border-emerald-200 hover:bg-white/80 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 rounded-3xl"
                    onClick={() => navigate(`/plant/${plant.id}`)}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <ImageWithFallback
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-emerald-600 border border-emerald-200 backdrop-blur-sm rounded-full text-xs">
                        {plant.category}
                      </Badge>
                    </div>
                    
                    <div className="p-4 sm:p-5">
                      <h3 className="mb-1 text-gray-800 text-base sm:text-lg line-clamp-1">{plant.name}</h3>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-1">{plant.seller}</p>
                      
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                        <span className="text-sm text-gray-600">{plant.rating}</span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-emerald-600 font-medium text-base sm:text-lg">₱{plant.price.toLocaleString()}</span>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-xl shadow-md min-h-[44px] px-4"
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
                              toast.success(`${plant.name} added to cart! 🌿`);
                            }}
                          >
                            Add to Cart
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Section */}
          <div>
            <h2 className="mb-4 text-gray-700">Recommended For You</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredPlants.slice(0, 2).map((plant) => (
                <motion.div
                  key={`rec-${plant.id}`}
                  whileHover={{ y: -4 }}
                >
                  <Card
                    className="flex gap-4 p-4 cursor-pointer backdrop-blur-xl bg-white/70 border-2 border-white/60 hover:border-emerald-200 hover:bg-white/80 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 rounded-3xl"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/60">
                      <ImageWithFallback
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="mb-1 text-gray-800">{plant.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{plant.seller}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-600 font-medium">₱{plant.price.toLocaleString()}</span>
                        <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-xl">
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}