import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ArrowLeft, Star, ShoppingCart, Droplets, Sun, Wind, Ruler, Heart, Share2, Info } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useProducts } from '../ProductContext';
import { useCart } from '../CartContext';
import { toast } from 'sonner';
import { EcoBackground } from '../EcoBackground';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Extended plant data with care instructions and descriptions
const plantDetailsData: Record<number, {
  description: string;
  fullDescription: string;
  careLevel: string;
  waterRequirement: string;
  sunlightRequirement: string;
  humidityLevel: string;
  soilType: string;
  toxicity: string;
  growthRate: string;
  matureSize: string;
  benefits: string[];
  careInstructions: {
    watering: string;
    lighting: string;
    temperature: string;
    fertilizing: string;
    pruning: string;
  };
  reviews: {
    id: number;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}> = {
  1: {
    description: "Large, glossy split leaves perfect for bringing tropical vibes to any space.",
    fullDescription: "The Monstera Deliciosa, also known as the Swiss Cheese Plant, is an iconic tropical houseplant with large, glossy, fenestrated leaves. Native to the rainforests of Central America, this stunning plant can grow quite large indoors and makes a bold statement in any room. Its distinctive split leaves develop as the plant matures, creating a unique and dramatic appearance.",
    careLevel: "Easy to Moderate",
    waterRequirement: "Moderate - Water when top 2-3 inches of soil are dry",
    sunlightRequirement: "Bright indirect light",
    humidityLevel: "60-80% (High)",
    soilType: "Well-draining, peat-based mix",
    toxicity: "Toxic to pets and humans if ingested",
    growthRate: "Fast",
    matureSize: "6-10 feet indoors",
    benefits: ["Air purifying", "Easy to propagate", "Low maintenance", "Statement piece"],
    careInstructions: {
      watering: "Water thoroughly when the top 2-3 inches of soil feel dry. Reduce watering in winter. Ensure proper drainage to prevent root rot.",
      lighting: "Thrives in bright, indirect light but can tolerate lower light conditions. Avoid direct sunlight which can scorch the leaves.",
      temperature: "Prefers temperatures between 65-85°F (18-29°C). Protect from cold drafts and sudden temperature changes.",
      fertilizing: "Feed monthly during spring and summer with a balanced liquid fertilizer diluted to half strength. No fertilizing needed in winter.",
      pruning: "Prune to control size and shape. Remove any yellow or damaged leaves. Aerial roots can be trimmed or tucked into the soil."
    },
    reviews: [
      {
        id: 1,
        author: "Maria Santos",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        rating: 5,
        date: "2 weeks ago",
        comment: "Absolutely love this Monstera! It arrived in perfect condition and has already put out a new leaf. The packaging was excellent. Highly recommend!"
      },
      {
        id: 2,
        author: "John Cruz",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        rating: 4,
        date: "1 month ago",
        comment: "Beautiful plant, very healthy. One leaf had a small tear but nothing major. Growing well in my living room!"
      },
      {
        id: 3,
        author: "Lisa Reyes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
        rating: 5,
        date: "1 month ago",
        comment: "This is my third Monstera from this seller. Always top quality. The plant is thriving and the customer service is excellent!"
      }
    ]
  }
};

// Default plant details for plants without specific data
const getDefaultPlantDetails = (category: string) => ({
  description: "A beautiful addition to any plant collection.",
  fullDescription: `This stunning ${category.toLowerCase()} plant brings natural beauty to your space. Perfect for plant enthusiasts of all levels, it adapts well to indoor environments and requires minimal care.`,
  careLevel: "Easy to Moderate",
  waterRequirement: "Moderate - Water when soil is partially dry",
  sunlightRequirement: "Bright indirect light",
  humidityLevel: "40-60% (Moderate)",
  soilType: "Well-draining potting mix",
  toxicity: "Consult care guide for pet safety",
  growthRate: "Moderate",
  matureSize: "Varies by species",
  benefits: ["Air purifying", "Easy care", "Beautiful foliage", "Adaptable"],
  careInstructions: {
    watering: "Water when the top inch of soil feels dry. Adjust frequency based on season and humidity.",
    lighting: "Place in bright, indirect light. Avoid direct sunlight which may damage leaves.",
    temperature: "Maintain temperatures between 60-80°F (15-27°C). Protect from extreme cold or heat.",
    fertilizing: "Apply a balanced fertilizer monthly during the growing season. Reduce in fall and winter.",
    pruning: "Remove dead or yellowing leaves as needed. Trim to maintain desired shape and size."
  },
  reviews: [
    {
      id: 1,
      author: "Happy Customer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Customer1",
      rating: 5,
      date: "3 weeks ago",
      comment: "Great quality plant! Arrived healthy and well-packaged. Very satisfied with my purchase."
    },
    {
      id: 2,
      author: "Plant Lover",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Customer2",
      rating: 4,
      date: "1 month ago",
      comment: "Beautiful plant, exactly as described. It's doing well in my home. Would buy again!"
    }
  ]
});

export function PlantDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const plant = products.find(p => p.id === Number(id));

  if (!plant) {
    return (
      <div className="min-h-screen relative pb-20 overflow-hidden">
        <EcoBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <Card className="p-12 text-center backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl max-w-md">
            <Info className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
            <h2 className="mb-2 text-gray-800">Plant Not Found</h2>
            <p className="text-gray-600 mb-6">
              The plant you're looking for doesn't exist or has been removed.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate('/home')}
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl"
              >
                Back to Shop
              </Button>
            </motion.div>
          </Card>
        </div>
      </div>
    );
  }

  const details = plantDetailsData[plant.id] || getDefaultPlantDetails(plant.category);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: plant.id,
        name: plant.name,
        seller: plant.seller,
        price: plant.price,
        image: plant.image,
        category: plant.category,
      });
    }
    toast.success(`${quantity} ${plant.name}${quantity > 1 ? 's' : ''} added to cart! 🌿`);
  };

  const handleShare = () => {
    toast.success('Link copied to clipboard! 📋');
  };

  const averageRating = details.reviews.reduce((acc, review) => acc + review.rating, 0) / details.reviews.length;

  return (
    <div className="min-h-screen relative pb-20 overflow-hidden">
      <EcoBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/40 border-b border-white/30 px-4 sm:px-6 py-6 sm:py-8 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-gray-700 hover:bg-white/60 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="overflow-hidden backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-xl">
                <div className="aspect-square relative">
                  <ImageWithFallback
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-emerald-600 border border-emerald-200 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                    {plant.category}
                  </Badge>
                </div>
              </Card>

              {/* Quick Care Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="mt-4 p-5 sm:p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg">
                  <h3 className="mb-4 text-gray-800 text-lg">Quick Care Guide</h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Droplets className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Water</p>
                        <p className="text-sm text-gray-800 truncate">Moderate</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <Sun className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Light</p>
                        <p className="text-sm text-gray-800 truncate">Bright Indirect</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <Wind className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Humidity</p>
                        <p className="text-sm text-gray-800 truncate">{details.humidityLevel.split('(')[1]?.replace(')', '') || 'Moderate'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Ruler className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Growth</p>
                        <p className="text-sm text-gray-800 truncate">{details.growthRate}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-5 sm:p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-xl">
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-gray-800 mb-2 text-2xl sm:text-3xl">{plant.name}</h1>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">{details.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(plant.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {plant.rating} ({details.reviews.length} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full">
                        {details.careLevel}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 border border-blue-200 rounded-full">
                        {details.growthRate} Growth
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 border-2 border-white/60 hover:border-rose-300 flex items-center justify-center transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleShare}
                      className="w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 border-2 border-white/60 hover:border-emerald-300 flex items-center justify-center"
                    >
                      <Share2 className="w-5 h-5 text-gray-400" />
                    </motion.button>
                  </div>
                </div>

                <Separator className="my-6 bg-white/60" />

                {/* Price and Add to Cart */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-emerald-600">{plant.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">per plant</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Sold by <span className="font-medium text-gray-800">{plant.seller}</span>
                  </p>

                  {/* Quantity Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                    <span className="text-sm text-gray-700">Quantity:</span>
                    <div className="flex items-center gap-0 border-2 border-white/60 rounded-xl backdrop-blur-sm bg-white/50">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 flex items-center justify-center hover:bg-emerald-50 rounded-l-xl transition-colors text-lg"
                      >
                        -
                      </button>
                      <span className="px-4 text-gray-700 min-w-[60px] text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 flex items-center justify-center hover:bg-emerald-50 rounded-r-xl transition-colors text-lg"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm sm:text-base text-gray-600">
                      Total: ₱{(plant.price * quantity).toLocaleString()}
                    </span>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50 h-12 sm:h-14 text-base"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                  </motion.div>
                </div>

                <Separator className="my-6 bg-white/60" />

                {/* Benefits */}
                <div>
                  <h3 className="mb-3 text-gray-800">Plant Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {details.benefits.map((benefit, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-white/80 border border-emerald-200 rounded-full"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Detailed Information Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-xl">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full backdrop-blur-xl bg-white/60 border-2 border-white/40 p-1 rounded-2xl mb-6">
                  <TabsTrigger value="description" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="care" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
                    Care Guide
                  </TabsTrigger>
                  <TabsTrigger value="specs" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
                    Reviews ({details.reviews.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-3 text-gray-800">About This Plant</h3>
                      <p className="text-gray-700 leading-relaxed">{details.fullDescription}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="care" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-5 h-5 text-blue-600" />
                        <h4 className="text-gray-800">Watering</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{details.careInstructions.watering}</p>
                    </div>
                    <Separator className="bg-white/60" />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="w-5 h-5 text-amber-600" />
                        <h4 className="text-gray-800">Lighting</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{details.careInstructions.lighting}</p>
                    </div>
                    <Separator className="bg-white/60" />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Wind className="w-5 h-5 text-cyan-600" />
                        <h4 className="text-gray-800">Temperature</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{details.careInstructions.temperature}</p>
                    </div>
                    <Separator className="bg-white/60" />
                    <div>
                      <h4 className="mb-2 text-gray-800">Fertilizing</h4>
                      <p className="text-gray-700 leading-relaxed">{details.careInstructions.fertilizing}</p>
                    </div>
                    <Separator className="bg-white/60" />
                    <div>
                      <h4 className="mb-2 text-gray-800">Pruning</h4>
                      <p className="text-gray-700 leading-relaxed">{details.careInstructions.pruning}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="mt-0">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
                      <p className="text-sm text-gray-600 mb-1">Care Level</p>
                      <p className="text-gray-800">{details.careLevel}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
                      <p className="text-sm text-gray-600 mb-1">Mature Size</p>
                      <p className="text-gray-800">{details.matureSize}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
                      <p className="text-sm text-gray-600 mb-1">Water Requirement</p>
                      <p className="text-gray-800">{details.waterRequirement}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
                      <p className="text-sm text-gray-600 mb-1">Sunlight</p>
                      <p className="text-gray-800">{details.sunlightRequirement}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
                      <p className="text-sm text-gray-600 mb-1">Humidity Level</p>
                      <p className="text-gray-800">{details.humidityLevel}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
                      <p className="text-sm text-gray-600 mb-1">Soil Type</p>
                      <p className="text-gray-800">{details.soilType}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
                      <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
                      <p className="text-gray-800">{details.growthRate}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
                      <p className="text-sm text-gray-600 mb-1">Toxicity</p>
                      <p className="text-gray-800">{details.toxicity}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(averageRating)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-gray-200 text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{details.reviews.length} reviews</p>
                      </div>
                    </div>

                    <Separator className="bg-white/60" />

                    <div className="space-y-6 mt-6">
                      {details.reviews.map((review) => (
                        <div key={review.id} className="flex gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={review.avatar} alt={review.author} />
                            <AvatarFallback>{review.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium text-gray-800">{review.author}</p>
                                <p className="text-sm text-gray-500">{review.date}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'fill-amber-400 text-amber-400'
                                        : 'fill-gray-200 text-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}