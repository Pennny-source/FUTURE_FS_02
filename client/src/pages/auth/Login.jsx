import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 via-transparent to-neon-purple/20 animate-pulse" />
      <div className="relative z-10 w-full max-w-md p-8 glass">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-electric-blue to-neon-purple bg-clip-text text-transparent mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue transition"
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue transition"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-blue-purple rounded-lg font-semibold hover:shadow-glow transition">
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-400 space-y-2">
          <p>
            <Link to="/forgot-password" className="text-soft-cyan hover:underline">Forgot password?</Link>
          </p>
          <p>
            Don't have an account? <Link to="/signup" className="text-electric-blue hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}