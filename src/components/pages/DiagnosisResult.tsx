import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Droplets, Sun, Sprout, AlertTriangle, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { Progress } from '../ui/progress';
import { EcoBackground } from '../EcoBackground';
import { motion } from 'motion/react';

export function DiagnosisResult() {
  const navigate = useNavigate();

  const diagnosisData = {
    plantName: 'Monstera Deliciosa',
    issue: 'Leaf Yellowing',
    confidence: 87,
    severity: 'moderate',
    image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const careSteps = [
    {
      icon: Droplets,
      title: 'Watering',
      description: 'Water when top 2 inches of soil are dry',
      recommendation: 'Reduce watering frequency to once per week',
      color: 'blue',
    },
    {
      icon: Sun,
      title: 'Sunlight',
      description: 'Provide bright, indirect light',
      recommendation: 'Move to a spot with more natural light',
      color: 'yellow',
    },
    {
      icon: Sprout,
      title: 'Fertilizer',
      description: 'Feed monthly during growing season',
      recommendation: 'Apply balanced liquid fertilizer next watering',
      color: 'green',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-emerald-600 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200';
      case 'moderate':
        return 'text-amber-600 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200';
      case 'high':
        return 'text-rose-600 bg-gradient-to-r from-rose-50 to-red-50 border-rose-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen relative pb-20 overflow-hidden">
      <EcoBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/40 border-b border-white/30 px-4 py-6 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/scan')}
                  className="text-gray-700 hover:bg-white/60 rounded-xl"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:bg-white/60 rounded-xl"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </motion.div>
            </div>
            <h1 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Diagnosis Result</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Scanned Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-xl mb-6">
              <div className="aspect-video relative">
                <ImageWithFallback
                  src={diagnosisData.image}
                  alt={diagnosisData.plantName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h2 className="mb-2 text-gray-800">{diagnosisData.plantName}</h2>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getSeverityColor(diagnosisData.severity)}`}>
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm capitalize font-medium">{diagnosisData.severity} Issue</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Detected Issue</span>
                    <span className="text-gray-800 font-medium">{diagnosisData.issue}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Confidence</span>
                    <span className="text-emerald-600 font-medium">{diagnosisData.confidence}%</span>
                  </div>
                  <Progress value={diagnosisData.confidence} className="h-2" />
                </div>

                <div className="backdrop-blur-xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 border-2 border-blue-200/50 rounded-2xl p-4">
                  <p className="text-blue-900">
                    Your Monstera is showing signs of leaf yellowing, likely due to overwatering. 
                    Follow the care recommendations below to help your plant recover.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Care Recommendations */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <h2 className="text-gray-700">Recommended Care Steps</h2>
          </div>
          
          <div className="space-y-4">
            {careSteps.map((step, index) => {
              const Icon = step.icon;
              const iconColorClass = 
                step.color === 'blue' ? 'text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200' :
                step.color === 'yellow' ? 'text-amber-600 bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200' :
                'text-emerald-600 bg-gradient-to-br from-emerald-50 to-green-100/50 border-emerald-200';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <Card className="p-5 backdrop-blur-xl bg-white/70 border-2 border-white/60 hover:border-emerald-200 rounded-2xl shadow-md hover:shadow-lg hover:shadow-emerald-100/50 transition-all">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${iconColorClass}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="mb-1 text-gray-800">{step.title}</h3>
                        <p className="text-gray-600 mb-2">{step.description}</p>
                        <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-50/80 to-green-50/80 border-l-4 border-emerald-500 p-3 rounded-xl">
                          <p className="text-emerald-800">
                            <strong>Action:</strong> {step.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                onClick={() => navigate('/reminders')}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50"
              >
                Set Reminders
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                onClick={() => navigate('/growth')}
                variant="outline"
                className="w-full border-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-2xl"
              >
                Track Progress
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
