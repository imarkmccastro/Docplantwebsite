import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Plus, Calendar, Camera, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { EcoBackground } from '../EcoBackground';
import { motion } from 'motion/react';

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
    <div className="min-h-screen relative pb-20 overflow-hidden">
      <EcoBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/40 border-b border-white/30 px-4 py-8 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h1 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">Growth Tracker</h1>
            <p className="text-gray-600">Document your plant's journey</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Plant Selection */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <h2 className="text-gray-700">Your Plants</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {plants.map((plant, index) => (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card
                    onClick={() => setSelectedPlant(plant)}
                    className={`p-3 cursor-pointer transition-all backdrop-blur-xl bg-white/70 border-2 rounded-2xl ${
                      selectedPlant.id === plant.id
                        ? 'border-emerald-400 shadow-lg shadow-emerald-100'
                        : 'border-white/60 hover:border-emerald-200 hover:shadow-md'
                    }`}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-2 border-2 border-white/60">
                      <ImageWithFallback
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm truncate text-gray-800">{plant.name}</p>
                    <p className="text-xs text-gray-500">Since {plant.startDate}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-700">{selectedPlant.name} Timeline</h2>
            
            <Dialog>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Update
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="backdrop-blur-xl bg-white/95 border-2 border-white/60 rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-gray-800">Add Growth Update</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="updateDate" className="text-gray-700">Date</Label>
                    <Input id="updateDate" type="date" className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" />
                  </div>
                  <div>
                    <Label htmlFor="updateNote" className="text-gray-700">Notes</Label>
                    <Textarea
                      id="updateNote"
                      placeholder="Describe what's new with your plant..."
                      className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Photo</Label>
                    <div className="mt-1 border-2 border-dashed border-emerald-300 rounded-2xl p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-all cursor-pointer backdrop-blur-sm bg-white/50">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                      <p className="text-sm text-gray-600">Click to upload photo</p>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50">
                    Save Update
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 via-green-200 to-transparent"></div>

            <div className="space-y-6">
              {selectedPlant.updates.map((update, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    className="absolute left-6 top-6 w-5 h-5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full border-4 border-white shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  ></motion.div>

                  <Card className="p-5 backdrop-blur-xl bg-white/70 border-2 border-white/60 hover:border-emerald-200 rounded-2xl shadow-md hover:shadow-lg hover:shadow-emerald-100/50 transition-all">
                    <div className="flex items-start gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-emerald-600 mt-1" />
                      <span className="text-emerald-600 font-medium">{update.date}</span>
                    </div>
                    
                    {update.image && (
                      <div className="rounded-2xl overflow-hidden mb-3 aspect-video border-2 border-white/60">
                        <ImageWithFallback
                          src={update.image}
                          alt="Plant update"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-700">{update.note}</p>
                  </Card>
                </motion.div>
              ))}

              {/* Start Marker */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: selectedPlant.updates.length * 0.1 }}
                className="relative pl-20"
              >
                <div className="absolute left-6 top-6 w-5 h-5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full border-4 border-white shadow-lg"></div>
                <Card className="p-5 backdrop-blur-xl bg-gradient-to-br from-gray-50/80 to-white/70 border-2 border-white/60 rounded-2xl shadow-md">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-gray-600 mt-1" />
                    <div>
                      <span className="text-gray-600 font-medium">{selectedPlant.startDate}</span>
                      <p className="text-gray-500 mt-1">Started tracking this plant</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
