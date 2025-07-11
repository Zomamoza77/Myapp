import React, { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, Settings, Database, Users } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process with 2FA
    setTimeout(() => {
      if (!showTwoFactor) {
        setShowTwoFactor(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        onLogin();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-purple-200">Platform Management & Control Center</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!showTwoFactor ? (
              <>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-purple-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="admin@pickpen.edu"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-purple-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter admin password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Two-Factor Authentication */
              <div>
                <label htmlFor="twoFactor" className="block text-sm font-medium text-white mb-2">
                  Two-Factor Authentication Code
                </label>
                <div className="relative">
                  <Shield className="w-5 h-5 text-purple-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    id="twoFactor"
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-center text-lg tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-purple-200 text-xs mt-2 text-center">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-purple-700 hover:from-red-700 hover:to-purple-800 transform hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {showTwoFactor ? 'Verifying...' : 'Authenticating...'}
                </div>
              ) : (
                showTwoFactor ? 'Verify & Sign In' : 'Continue to 2FA'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-red-900/30 rounded-xl border border-red-500/30">
            <div className="flex items-center mb-2">
              <Shield className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-sm font-medium text-red-200">Demo Admin Access</span>
            </div>
            <div className="text-xs text-red-100 space-y-1">
              <p><strong>Email:</strong> admin@pickpen.edu</p>
              <p><strong>Password:</strong> admin2025</p>
              <p><strong>2FA Code:</strong> 123456</p>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <Shield className="w-6 h-6 text-purple-300 mx-auto mb-2" />
            <span className="text-xs text-purple-200">2FA Security</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <Database className="w-6 h-6 text-purple-300 mx-auto mb-2" />
            <span className="text-xs text-purple-200">Data Protection</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <Users className="w-6 h-6 text-purple-300 mx-auto mb-2" />
            <span className="text-xs text-purple-200">User Management</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-purple-300">
            Secure Admin Access • Platform Version 2.1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;