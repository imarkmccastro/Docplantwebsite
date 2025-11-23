import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Leaf, Mail, Lock, Sparkles } from 'lucide-react';
import { useUser } from '../UserContext';
import { toast } from 'sonner@2.0.3';
import { motion } from 'framer-motion';
import { EcoBackground } from '../EcoBackground';
import { GlassCard } from '../GlassCard';

export function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = login(formData.email, formData.password);
    
    if (success) {
      toast.success('Welcome back! 🌿');
      navigate('/home');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleSocialLogin = () => {
    const success = login('admin@docplant.com', 'admin123');
    if (success) {
      toast.success('Welcome back! 🌿');
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <EcoBackground />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard>
          <div className="p-8">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  {/* Soft glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full blur-2xl opacity-40"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Logo Container */}
                  <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400/30 to-green-400/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg">
                    <Leaf className="w-12 h-12 text-emerald-600" />
                    <Sparkles className="w-4 h-4 text-green-500 absolute top-2 right-2" />
                  </div>
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2"
              >
                Doc Plant
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600"
              >
                Welcome back to your green sanctuary
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-gray-700 mb-2 block">
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <Mail className={`w-5 h-5 transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'text-emerald-500' 
                        : 'text-gray-400'
                    }`} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`pl-12 bg-white/50 border-2 transition-all duration-300 rounded-2xl h-12 ${
                      focusedField === 'email'
                        ? 'border-emerald-400 shadow-lg shadow-emerald-100'
                        : 'border-white/60'
                    }`}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-emerald-600 hover:text-green-600 transition-colors duration-300"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <Lock className={`w-5 h-5 transition-all duration-300 ${
                      focusedField === 'password' 
                        ? 'text-emerald-500' 
                        : 'text-gray-400'
                    }`} />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`pl-12 bg-white/50 border-2 transition-all duration-300 rounded-2xl h-12 ${
                      focusedField === 'password'
                        ? 'border-emerald-400 shadow-lg shadow-emerald-100'
                        : 'border-white/60'
                    }`}
                  />
                </div>
              </div>

              {/* Natural Glow Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl h-12 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 transition-all duration-300"
                >
                  <span className="relative z-10">Log In</span>
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/70 text-gray-500 rounded-full">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={handleSocialLogin}
                  className="w-full bg-white/60 border-2 border-white/60 hover:bg-white/80 hover:border-emerald-200 transition-all duration-300 rounded-2xl h-12"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={handleSocialLogin}
                  className="w-full bg-white/60 border-2 border-white/60 hover:bg-white/80 hover:border-emerald-200 transition-all duration-300 rounded-2xl h-12"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Apple
                </Button>
              </motion.div>
            </div>

            {/* Sign Up Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-gray-600"
            >
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-emerald-600 hover:text-green-600 transition-all duration-300 font-medium"
              >
                Sign up
              </Link>
            </motion.p>
          </div>
        </GlassCard>

        {/* Decorative leaf accents */}
        <motion.div
          className="absolute -top-8 -left-8 text-emerald-400/20"
          animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Leaf className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute -bottom-8 -right-8 text-green-400/20"
          animate={{ rotate: [0, -10, 0], y: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Leaf className="w-20 h-20" />
        </motion.div>
      </motion.div>
    </div>
  );
}
