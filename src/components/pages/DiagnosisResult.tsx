import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Droplets, Sun, Sprout, AlertTriangle, ArrowLeft, Share2 } from 'lucide-react';
import { Progress } from '../ui/progress';

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
        return 'text-green-600 bg-green-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/scan')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
          <h1 className="text-white">Diagnosis Result</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Scanned Image */}
        <Card className="overflow-hidden shadow-md mb-6">
          <div className="aspect-video relative">
            <ImageWithFallback
              src={diagnosisData.image}
              alt={diagnosisData.plantName}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <h2 className="mb-2">{diagnosisData.plantName}</h2>
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getSeverityColor(diagnosisData.severity)}`}>
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm capitalize">{diagnosisData.severity} Issue</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Detected Issue</span>
                <span className="text-gray-600">{diagnosisData.issue}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Confidence</span>
                <span className="text-green-600">{diagnosisData.confidence}%</span>
              </div>
              <Progress value={diagnosisData.confidence} className="h-2" />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900">
                Your Monstera is showing signs of leaf yellowing, likely due to overwatering. 
                Follow the care recommendations below to help your plant recover.
              </p>
            </div>
          </div>
        </Card>

        {/* Care Recommendations */}
        <h2 className="mb-4">Recommended Care Steps</h2>
        
        <div className="space-y-4">
          {careSteps.map((step, index) => {
            const Icon = step.icon;
            const iconColorClass = 
              step.color === 'blue' ? 'text-blue-600 bg-blue-100' :
              step.color === 'yellow' ? 'text-yellow-600 bg-yellow-100' :
              'text-green-600 bg-green-100';

            return (
              <Card key={index} className="p-5 shadow-sm">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="mb-1">{step.title}</h3>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                      <p className="text-green-800">
                        <strong>Action:</strong> {step.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={() => navigate('/reminders')}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Set Reminders
          </Button>
          <Button
            onClick={() => navigate('/growth')}
            variant="outline"
            className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
          >
            Track Progress
          </Button>
        </div>
      </div>
    </div>
  );
}
