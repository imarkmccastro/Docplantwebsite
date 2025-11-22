import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Plus, Droplets, Sun, Sprout, Calendar, Bell, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { EcoBackground } from '../EcoBackground';
import { motion } from 'motion/react';

export function Reminders() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      plantName: 'Monstera Deliciosa',
      type: 'water',
      dueDate: 'Today',
      time: '10:00 AM',
      frequency: 'Every 7 days',
      enabled: true,
      image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      plantName: 'Succulent Collection',
      type: 'water',
      dueDate: 'Tomorrow',
      time: '9:00 AM',
      frequency: 'Every 14 days',
      enabled: true,
      image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      plantName: 'Monstera Deliciosa',
      type: 'fertilize',
      dueDate: 'Nov 15, 2025',
      time: '10:00 AM',
      frequency: 'Every 30 days',
      enabled: true,
      image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      plantName: 'Peace Lily',
      type: 'mist',
      dueDate: 'Every day',
      time: '7:00 PM',
      frequency: 'Daily',
      enabled: false,
      image: 'https://images.unsplash.com/photo-1615420733059-0d97cf9ed9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMGluZG9vcnxlbnwxfHx8fDE3NjI2NTg1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ]);

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'water':
        return { icon: Droplets, color: 'bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600 border-blue-200' };
      case 'fertilize':
        return { icon: Sprout, color: 'bg-gradient-to-br from-emerald-50 to-green-100/50 text-emerald-600 border-emerald-200' };
      case 'mist':
        return { icon: Sun, color: 'bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-600 border-amber-200' };
      default:
        return { icon: Bell, color: 'bg-gradient-to-br from-gray-50 to-gray-100/50 text-gray-600 border-gray-200' };
    }
  };

  const getReminderLabel = (type: string) => {
    switch (type) {
      case 'water':
        return 'Water';
      case 'fertilize':
        return 'Fertilize';
      case 'mist':
        return 'Mist';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen relative pb-20 overflow-hidden">
      <EcoBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/40 border-b border-white/30 px-4 py-8 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h1 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">Reminders</h1>
            <p className="text-gray-600">Stay on top of your plant care schedule</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Add Reminder Button */}
          <div className="mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Reminder
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="backdrop-blur-xl bg-white/95 border-2 border-white/60 rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-gray-800">Create Plant Reminder</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="plant" className="text-gray-700">Plant</Label>
                    <Select>
                      <SelectTrigger className="mt-1 bg-white/50 border-2 border-white/60 rounded-2xl">
                        <SelectValue placeholder="Select a plant" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-xl bg-white/95 border-2 border-white/60 rounded-2xl">
                        <SelectItem value="monstera">Monstera Deliciosa</SelectItem>
                        <SelectItem value="succulent">Succulent Collection</SelectItem>
                        <SelectItem value="lily">Peace Lily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="reminderType" className="text-gray-700">Reminder Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1 bg-white/50 border-2 border-white/60 rounded-2xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-xl bg-white/95 border-2 border-white/60 rounded-2xl">
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="fertilize">Fertilize</SelectItem>
                        <SelectItem value="mist">Mist</SelectItem>
                        <SelectItem value="prune">Prune</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-gray-700">Start Date</Label>
                      <Input id="startDate" type="date" className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-gray-700">Time</Label>
                      <Input id="time" type="time" className="mt-1 bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="frequency" className="text-gray-700">Frequency</Label>
                    <Select>
                      <SelectTrigger className="mt-1 bg-white/50 border-2 border-white/60 rounded-2xl">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-xl bg-white/95 border-2 border-white/60 rounded-2xl">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Every 2 weeks</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50">
                    Create Reminder
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Upcoming Reminders */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <h2 className="text-gray-700">Upcoming Reminders</h2>
            </div>
            
            <div className="space-y-3">
              {reminders.map((reminder, index) => {
                const { icon: Icon, color } = getReminderIcon(reminder.type);
                
                return (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <Card className="p-4 backdrop-blur-xl bg-white/70 border-2 border-white/60 hover:border-emerald-200 rounded-2xl shadow-md hover:shadow-lg hover:shadow-emerald-100/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/60">
                          <ImageWithFallback
                            src={reminder.image}
                            alt={reminder.plantName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="mb-1 truncate text-gray-800">{reminder.plantName}</h3>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm text-gray-600">{getReminderLabel(reminder.type)}</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{reminder.dueDate}</span>
                            </div>
                            <span>•</span>
                            <span>{reminder.time}</span>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-1">{reminder.frequency}</p>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <Switch
                            checked={reminder.enabled}
                            onCheckedChange={() => toggleReminder(reminder.id)}
                          />
                          {reminder.enabled && (
                            <Bell className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg">
              <h2 className="mb-4 text-gray-700">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications on your device</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800">Email Reminders</p>
                    <p className="text-sm text-gray-500">Get reminders via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800">Early Reminders</p>
                    <p className="text-sm text-gray-500">Get notified 1 day before</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
