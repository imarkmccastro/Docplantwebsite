import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Plus, Calendar, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function GrowthTracker() {
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: 'Monstera Deliciosa',
      image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      startDate: 'Jan 15, 2025',
      updates: [
        {
          date: 'Nov 5, 2025',
          note: 'New leaf unfurling! Growth is looking great.',
          image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          date: 'Oct 20, 2025',
          note: 'Switched to a larger pot. Plant seems happy.',
          image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          date: 'Sep 10, 2025',
          note: 'First aerial root spotted!',
          image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
    {
      id: 2,
      name: 'Succulent Collection',
      image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      startDate: 'Mar 1, 2025',
      updates: [
        {
          date: 'Nov 1, 2025',
          note: 'All succulents looking healthy and full.',
          image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
  ]);

  const [selectedPlant, setSelectedPlant] = useState(plants[0]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white mb-2">Growth Tracker</h1>
          <p className="text-green-100">Document your plant's journey</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Plant Selection */}
        <div className="mb-6">
          <h2 className="mb-3">Your Plants</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {plants.map((plant) => (
              <Card
                key={plant.id}
                onClick={() => setSelectedPlant(plant)}
                className={`p-3 cursor-pointer transition-all ${
                  selectedPlant.id === plant.id
                    ? 'ring-2 ring-green-600 shadow-md'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-2">
                  <ImageWithFallback
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm truncate">{plant.name}</p>
                <p className="text-xs text-gray-500">Since {plant.startDate}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Header */}
        <div className="flex items-center justify-between mb-4">
          <h2>{selectedPlant.name} Timeline</h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Update
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Growth Update</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="updateDate">Date</Label>
                  <Input id="updateDate" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="updateNote">Notes</Label>
                  <Textarea
                    id="updateNote"
                    placeholder="Describe what's new with your plant..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Photo</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload photo</p>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Save Update
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200"></div>

          <div className="space-y-6">
            {selectedPlant.updates.map((update, index) => (
              <div key={index} className="relative pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-6 top-6 w-5 h-5 bg-green-600 rounded-full border-4 border-white shadow"></div>

                <Card className="p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-green-600 mt-1" />
                    <span className="text-green-600">{update.date}</span>
                  </div>
                  
                  {update.image && (
                    <div className="rounded-lg overflow-hidden mb-3 aspect-video">
                      <ImageWithFallback
                        src={update.image}
                        alt="Plant update"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <p className="text-gray-700">{update.note}</p>
                </Card>
              </div>
            ))}

            {/* Start Marker */}
            <div className="relative pl-20">
              <div className="absolute left-6 top-6 w-5 h-5 bg-gray-400 rounded-full border-4 border-white shadow"></div>
              <Card className="p-5 shadow-sm bg-gray-50">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-600 mt-1" />
                  <div>
                    <span className="text-gray-600">{selectedPlant.startDate}</span>
                    <p className="text-gray-500 mt-1">Started tracking this plant</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
