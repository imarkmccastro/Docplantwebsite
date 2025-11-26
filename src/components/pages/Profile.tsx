import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Camera, MapPin, Mail, User, Edit2, Save, Settings, LogOut, Package, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useUser } from '../UserContext';
import { toast } from 'sonner';
import { EcoBackground } from '../EcoBackground';
import { motion } from 'framer-motion';

export function Profile() {
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Guest User',
    email: currentUser?.email || 'guest@email.com',
    location: 'Philippines',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name || 'Guest'}`,
  });

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const [preferences] = useState([
    'Succulents',
    'Tropical Plants',
    'Low Maintenance',
    'Indoor Plants',
  ]);

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated! 🌿');
  };

  return (
    <div className="min-h-screen relative pb-20 overflow-hidden">
      <EcoBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/40 border-b border-white/30 px-4 py-8 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">My Profile</h1>
              {!isEditing ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="secondary"
                    size="sm"
                    className="bg-white/60 hover:bg-white/80 text-emerald-600 border-2 border-white/60 hover:border-emerald-200 rounded-2xl shadow-md"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg shadow-emerald-200/50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Avatar Section */}
            <div className="flex justify-center">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full blur-2xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Avatar className="w-32 h-32 border-4 border-white/80 shadow-xl backdrop-blur-sm relative">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700">
                    {profile.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:from-emerald-600 hover:to-green-600 transition-all"
                  >
                    <Camera className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-4">
          {/* Profile Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <h2 className="text-gray-700">Personal Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2 text-gray-700">
                    <User className="w-4 h-4 text-emerald-500" />
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl"
                    />
                  ) : (
                    <p className="text-gray-600 pl-6">{profile.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-gray-700">
                    <Mail className="w-4 h-4 text-emerald-500" />
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl"
                    />
                  ) : (
                    <p className="text-gray-600 pl-6">{profile.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center gap-2 mb-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="bg-white/50 border-2 border-white/60 focus:border-emerald-400 rounded-2xl"
                    />
                  ) : (
                    <p className="text-gray-600 pl-6">{profile.location}</p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Plant Preferences Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg mt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-700">Plant Preferences</h2>
                {isEditing && (
                  <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-xl">
                    Edit
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {preferences.map((pref, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 hover:from-emerald-100 hover:to-green-100 border border-emerald-200 rounded-full px-4 py-1"
                  >
                    {pref}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Statistics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg mt-4">
              <h2 className="mb-4 text-gray-700">Your Stats</h2>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-4 backdrop-blur-xl bg-gradient-to-br from-emerald-50/80 to-green-50/80 border border-white/60 rounded-2xl"
                >
                  <div className="text-emerald-600 font-medium mb-1">23</div>
                  <p className="text-sm text-gray-600">Plants</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-4 backdrop-blur-xl bg-gradient-to-br from-emerald-50/80 to-green-50/80 border border-white/60 rounded-2xl"
                >
                  <div className="text-emerald-600 font-medium mb-1">15</div>
                  <p className="text-sm text-gray-600">Posts</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-4 backdrop-blur-xl bg-gradient-to-br from-emerald-50/80 to-green-50/80 border border-white/60 rounded-2xl"
                >
                  <div className="text-emerald-600 font-medium mb-1">342</div>
                  <p className="text-sm text-gray-600">Likes</p>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg mt-4">
              <h2 className="mb-4 text-gray-700">Quick Actions</h2>
              <div className="space-y-3">
                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => navigate('/orders')}
                    variant="outline"
                    className="w-full justify-start bg-white/50 border-2 border-white/60 hover:bg-white/80 hover:border-emerald-200 rounded-2xl"
                  >
                    <Package className="w-4 h-4 mr-3 text-emerald-600" />
                    Track My Orders
                  </Button>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start bg-white/50 border-2 border-white/60 text-red-600 hover:bg-red-50 hover:border-red-200 rounded-2xl"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Log Out
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
