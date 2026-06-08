import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.forgotPassword(email);
      setSent(true);
      toast.success('Reset link sent');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-cyan/20 via-transparent to-electric-blue/20 animate-pulse" />
      <div className="relative z-10 w-full max-w-md p-8 glass">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Reset Password</h2>
        {sent ? (
          <p className="text-center text-gray-300">Check your email for a reset link.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-soft-cyan transition"
                placeholder="you@company.com"
                required
              />
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-soft-cyan to-electric-blue rounded-lg font-semibold hover:shadow-glow transition">
              Send Reset Link
            </button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-gray-400">
          <Link to="/login" className="text-electric-blue hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  );
}