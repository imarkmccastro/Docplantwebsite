import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { useUser } from '../components/UserContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (!ok) {
      toast.error('Invalid credentials');
      return;
    }
    const isAdmin = email === 'admin@docplant.com';
    if (!isAdmin) {
      toast.error('Admin access only');
      return;
    }
    toast.success('Welcome, Admin');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border p-6 shadow-sm">
        <h1 className="mb-1 text-center">Admin Login</h1>
        <p className="text-center text-gray-600 mb-6">Restricted area</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1" />
          </div>
          <Button type="submit" className="w-full">Log in</Button>
        </form>
        <Button variant="outline" className="w-full mt-3" disabled>Social login coming soon</Button>
      </div>
    </div>
  );
}
