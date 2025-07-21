import React from 'react';
import { Trophy, Crown, Star } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-8">
      {/* Main Header */}
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
          <Trophy className="h-8 w-8 text-yellow-300" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Leaderboard
        </h1>
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
          <Crown className="h-8 w-8 text-yellow-300" />
        </div>
      </div>
      
      
      {/* Decorative elements */}
      <div className="flex justify-center space-x-4 mb-6">
        <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
        <Star className="h-5 w-5 text-yellow-300 animate-pulse delay-300" />
        <Star className="h-4 w-4 text-yellow-300 animate-pulse delay-700" />
      </div>
    </div>
  );
}