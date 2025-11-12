import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Plus, Droplets, Sun, Sprout, Calendar, Bell } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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
        return { icon: Droplets, color: 'bg-blue-100 text-blue-600' };
      case 'fertilize':
        return { icon: Sprout, color: 'bg-green-100 text-green-600' };
      case 'mist':
        return { icon: Sun, color: 'bg-yellow-100 text-yellow-600' };
      default:
        return { icon: Bell, color: 'bg-gray-100 text-gray-600' };
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white mb-2">Reminders</h1>
          <p className="text-green-100">Stay on top of your plant care schedule</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Add Reminder Button */}
        <div className="mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Reminder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Plant Reminder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="plant">Plant</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a plant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monstera">Monstera Deliciosa</SelectItem>
                      <SelectItem value="succulent">Succulent Collection</SelectItem>
                      <SelectItem value="lily">Peace Lily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reminderType">Reminder Type</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="fertilize">Fertilize</SelectItem>
                      <SelectItem value="mist">Mist</SelectItem>
                      <SelectItem value="prune">Prune</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Every 2 weeks</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Create Reminder
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Upcoming Reminders */}
        <div className="mb-6">
          <h2 className="mb-4">Upcoming Reminders</h2>
          
          <div className="space-y-3">
            {reminders.map((reminder) => {
              const { icon: Icon, color } = getReminderIcon(reminder.type);
              
              return (
                <Card key={reminder.id} className="p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={reminder.image}
                        alt={reminder.plantName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 truncate">{reminder.plantName}</h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
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
                        <Bell className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Notification Settings */}
        <Card className="p-6 shadow-md">
          <h2 className="mb-4">Notification Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive notifications on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Email Reminders</p>
                <p className="text-sm text-gray-500">Get reminders via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Early Reminders</p>
                <p className="text-sm text-gray-500">Get notified 1 day before</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
