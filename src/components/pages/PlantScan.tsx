import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Scan, Camera, Upload, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

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
    // Simulate scanning and navigate to diagnosis
    navigate('/diagnosis');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'needs-water':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'attention':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white mb-2">Plant Scanner</h1>
          <p className="text-green-100">Scan your plant to check its health</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Scan Button Card */}
        <Card className="p-8 shadow-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
              <Scan className="w-16 h-16 text-green-600" />
            </div>
          </div>
          
          <h2 className="mb-2">Scan Your Plant</h2>
          <p className="text-gray-600 mb-6">
            Take a photo or upload an image to analyze your plant's health
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleScan}
              className="bg-green-600 hover:bg-green-700"
            >
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </Button>
            <Button
              onClick={handleScan}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Image
            </Button>
          </div>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Card className="p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/reminders')}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">View</p>
                <p className="text-blue-600">Reminders</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/growth')}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Scan className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Track</p>
                <p className="text-purple-600">Growth</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Scans */}
        <div className="mt-8">
          <h2 className="mb-4">Recent Scans</h2>
          
          <div className="space-y-4">
            {recentScans.map((scan) => (
              <Card
                key={scan.id}
                className="p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/diagnosis')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={scan.image}
                      alt={scan.plantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 truncate">{scan.plantName}</h3>
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(scan.status)}
                      <span className="text-sm text-gray-600">{getStatusText(scan.status)}</span>
                    </div>
                    <p className="text-sm text-gray-500">{scan.date}</p>
                  </div>

                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
