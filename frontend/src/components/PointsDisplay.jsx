import React from 'react';
import { Star, TrendingUp, Sparkles } from 'lucide-react';

export default function PointsDisplay({ randomPoints, totalPoints, username, isVisible }) {
  if (!isVisible || randomPoints === undefined) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-6 text-white shadow-2xl transform transition-all duration-500 hover:scale-105 border-2 border-white/30 relative overflow-hidden animate-pulse">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <Sparkles className="absolute top-2 right-2 h-4 w-4 animate-pulse" />
          <Sparkles className="absolute bottom-4 left-4 h-3 w-3 animate-pulse delay-300" />
          <Sparkles className="absolute top-1/2 left-1/2 h-2 w-2 animate-pulse delay-700" />
          <Sparkles className="absolute top-4 left-8 h-3 w-3 animate-pulse delay-1000" />
          <Sparkles className="absolute bottom-8 right-8 h-2 w-2 animate-pulse delay-1300" />
        </div>
        
        {/* Celebration border animation */}
        <div className="absolute inset-0 rounded-2xl border-4 border-yellow-300/50 animate-ping"></div>
        
        <div className="text-center relative z-10">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white/20 rounded-full p-3 animate-bounce">
              <Star className="h-8 w-8 text-yellow-200 animate-spin" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-2">🎉 Points Awarded! 🎉</h3>
          
          {username && (
            <p className="text-sm opacity-90 mb-3 bg-white/20 rounded-lg p-2">
              for <strong className="text-yellow-200">{username}</strong>
            </p>
          )}
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/30">
            <div className="text-4xl font-bold mb-1 text-yellow-200">
              +{randomPoints}
            </div>
            <div className="text-sm opacity-90">
              Random Points Earned
            </div>
          </div>
          
          {totalPoints !== undefined && (
            <div className="flex items-center justify-center space-x-2 text-sm bg-white/20 rounded-lg p-2">
              <TrendingUp className="h-4 w-4" />
              <span>Total Points: <strong className="text-yellow-200">{totalPoints}</strong></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}