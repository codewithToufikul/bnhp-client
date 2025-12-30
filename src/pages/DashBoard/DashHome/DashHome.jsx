import React from 'react'
import { BarChart3, Sparkles } from 'lucide-react'

const DashHome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ecfdf5' }}>
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Main Welcome Card */}
        <div 
          className="p-12 rounded-3xl shadow-2xl border transform hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: '#ffffff', borderColor: '#10b981' }}
        >
          {/* Icon Section */}
          <div className="flex justify-center mb-8">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: '#0f766e' }}
            >
              <BarChart3 className="w-10 h-10" style={{ color: '#ffffff' }} />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-800 to-emerald-500 bg-clip-text text-transparent"
            >
              Welcome to Dashboard
            </h1>
            <div className="flex items-center justify-center mb-4">
              <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#fde047' }}></div>
              <Sparkles className="w-6 h-6 mx-4" style={{ color: '#10b981' }} />
              <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#fde047' }}></div>
            </div>
            <p 
              className="text-xl font-medium opacity-80"
              style={{ color: '#0f172a' }}
            >
              Your command center for success
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0f766e' }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#fde047' }}></div>
          </div>
        </div>

        {/* Subtitle */}
        <p 
          className="mt-8 text-lg font-medium opacity-70"
          style={{ color: '#0f172a' }}
        >
          Streamline your workflow and unlock your potential
        </p>
      </div>
    </div>
  )
}

export default DashHome