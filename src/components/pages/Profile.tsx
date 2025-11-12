import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Camera, MapPin, Mail, User, Edit2, Save, Settings, LogOut, Package } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useUser } from '../UserContext';
import { toast } from 'sonner@2.0.3';

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
    // In production, this would save to backend
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-white">My Profile</h1>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/40"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-white text-green-600 hover:bg-white/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>

          {/* Avatar Section */}
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-700 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-4">
        {/* Profile Information Card */}
        <Card className="p-6 shadow-md">
          <h2 className="mb-4">Personal Information</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-gray-500" />
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              ) : (
                <p className="text-gray-700 pl-6">{profile.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-gray-500" />
                Email
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              ) : (
                <p className="text-gray-700 pl-6">{profile.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location" className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                Location
              </Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              ) : (
                <p className="text-gray-700 pl-6">{profile.location}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Plant Preferences Card */}
        <Card className="p-6 shadow-md mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2>Plant Preferences</h2>
            {isEditing && (
              <Button variant="outline" size="sm">
                Edit
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {preferences.map((pref, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-green-100 text-green-700 hover:bg-green-200"
              >
                {pref}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Statistics Card */}
        <Card className="p-6 shadow-md mt-4">
          <h2 className="mb-4">Your Stats</h2>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 mb-1">23</div>
              <p className="text-sm text-gray-600">Plants</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 mb-1">15</div>
              <p className="text-sm text-gray-600">Posts</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 mb-1">342</div>
              <p className="text-sm text-gray-600">Likes</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions Card */}
        <Card className="p-6 shadow-md mt-4">
          <h2 className="mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/orders')}
              variant="outline"
              className="w-full justify-start"
            >
              <Package className="w-4 h-4 mr-3" />
              Track My Orders
            </Button>
            <Button
              onClick={() => navigate('/admin')}
              variant="outline"
              className="w-full justify-start"
            >
              <Settings className="w-4 h-4 mr-3" />
              Admin Dashboard
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Log Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
