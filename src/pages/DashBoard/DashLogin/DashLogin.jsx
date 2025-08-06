import React, { useState } from 'react'
import { Lock, User, Eye, EyeOff } from 'lucide-react'

const DashLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#ecfdf5' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: '#0f766e' }}
          >
            <Lock className="w-8 h-8" style={{ color: '#ffffff' }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#0f172a' }}
              >
                Username
              </label>
              <div className="relative">
                <User 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ 
                    focusRingColor: '#0f766e',
                    borderColor: username ? '#10b981' : '#d1d5db'
                  }}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#0f172a' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ 
                    focusRingColor: '#0f766e',
                    borderColor: password ? '#10b981' : '#d1d5db'
                  }}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 focus:ring-2"
                  style={{ accentColor: '#0f766e' }}
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a 
                href="#" 
                className="font-medium hover:underline transition-colors"
                style={{ color: '#0f766e' }}
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                backgroundColor: isLoading ? '#6b7280' : '#0f766e',
                focusRingColor: '#0f766e'
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Additional Options */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Need help accessing your account?
              </p>
              <button
                className="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                style={{ 
                  color: '#0f766e',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #10b981'
                }}
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Admin Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashLogin