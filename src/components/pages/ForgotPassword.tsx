import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Leaf, Mail, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { EcoBackground } from '../EcoBackground';
import { GlassCard } from '../GlassCard';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success('Password reset link sent to your email! 📧');
    setIsSubmitted(true);
    
    setTimeout(() => {
      navigate('/login');
    }, 3000);
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
            {/* Back Button */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors duration-300 mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Login</span>
            </Link>

            {!isSubmitted ? (
              <>
                {/* Logo and Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex justify-center mb-6"
                  >
                    <div className="relative">
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
                      <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400/30 to-green-400/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg">
                        <Leaf className="w-10 h-10 text-emerald-600" />
                        <Sparkles className="w-3 h-3 text-green-500 absolute top-1 right-1" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2"
                  >
                    Reset Password
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 max-w-sm mx-auto"
                  >
                    Enter your email address and we'll send you a link to reset your password
                  </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <Label htmlFor="reset-email" className="text-gray-700 mb-2 block">
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
                        id="reset-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                  {/* Natural Glow Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl h-12 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 transition-all duration-300"
                    >
                      Send Reset Link
                    </Button>
                  </motion.div>
                </form>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 text-center text-gray-600"
                >
                  Remember your password?{' '}
                  <Link 
                    to="/login" 
                    className="text-emerald-600 hover:text-green-600 transition-all duration-300 font-medium"
                  >
                    Log in
                  </Link>
                </motion.p>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full blur-2xl opacity-40"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.6, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400/30 to-green-400/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3"
                >
                  Check Your Email
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 mb-2"
                >
                  We've sent a password reset link to
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-emerald-600 mb-6 font-medium"
                >
                  {email}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <p className="text-gray-500 text-sm">
                    Redirecting you to login page...
                  </p>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => navigate('/login')}
                      className="bg-white/60 border-2 border-white/60 hover:bg-white/80 hover:border-emerald-200 transition-all duration-300 rounded-2xl text-gray-700"
                    >
                      Back to Login
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-gray-500 text-sm"
                >
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-emerald-600 hover:text-green-600 transition-colors duration-300 font-medium"
                  >
                    try again
                  </button>
                </motion.p>
              </div>
            )}
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
