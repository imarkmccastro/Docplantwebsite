import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Scan, Camera, Upload, AlertCircle, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { EcoBackground } from '../EcoBackground';
import { motion } from 'motion/react';

export function PlantScan() {
  const navigate = useNavigate();
  const [recentScans] = useState([
    {
      id: 1,
      plantName: 'Monstera Deliciosa',
      status: 'healthy',
      image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      date: '2 days ago',
    },
    {
      id: 2,
      plantName: 'Succulent Mix',
      status: 'needs-water',
      image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: '5 days ago',
    },
    {
      id: 3,
      plantName: 'Peace Lily',
      status: 'attention',
      image: 'https://images.unsplash.com/photo-1615420733059-0d97cf9ed9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMGluZG9vcnxlbnwxfHx8fDE3NjI2NTg1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: '1 week ago',
    },
  ]);

  const handleScan = () => {
    navigate('/diagnosis');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'needs-water':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'attention':
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'Healthy';
      case 'needs-water':
        return 'Needs Water';
      case 'attention':
        return 'Needs Attention';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen relative pb-20 overflow-hidden">
      <EcoBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/40 border-b border-white/30 px-4 py-8 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h1 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">Plant Scanner</h1>
            <p className="text-gray-600">Scan your plant to check its health</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Scan Button Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-xl text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full blur-2xl opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-50/80 to-green-50/80 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/60 shadow-lg">
                    <Scan className="w-16 h-16 text-emerald-600" />
                  </div>
                </div>
              </div>
              
              <h2 className="mb-2 text-gray-800">Scan Your Plant</h2>
              <p className="text-gray-600 mb-6">
                Take a photo or upload an image to analyze your plant's health
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleScan}
                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Take Photo
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleScan}
                    variant="outline"
                    className="border-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-2xl"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Image
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card 
                className="p-4 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-2xl shadow-md cursor-pointer hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 transition-all" 
                onClick={() => navigate('/reminders')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-200">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">View</p>
                    <p className="text-blue-600 font-medium">Reminders</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card 
                className="p-4 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-2xl shadow-md cursor-pointer hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/50 transition-all" 
                onClick={() => navigate('/growth')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-purple-200">
                    <Scan className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Track</p>
                    <p className="text-purple-600 font-medium">Growth</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recent Scans */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <h2 className="text-gray-700">Recent Scans</h2>
            </div>
            
            <div className="space-y-4">
              {recentScans.map((scan, index) => (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <Card
                    className="p-4 backdrop-blur-xl bg-white/70 border-2 border-white/60 hover:border-emerald-200 hover:bg-white/80 rounded-2xl shadow-md hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer"
                    onClick={() => navigate('/diagnosis')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white/60">
                        <ImageWithFallback
                          src={scan.image}
                          alt={scan.plantName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 truncate text-gray-800">{scan.plantName}</h3>
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(scan.status)}
                          <span className="text-sm text-gray-600">{getStatusText(scan.status)}</span>
                        </div>
                        <p className="text-sm text-gray-500">{scan.date}</p>
                      </div>

                      <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-50 rounded-xl">
                        View
                      </Button>
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
