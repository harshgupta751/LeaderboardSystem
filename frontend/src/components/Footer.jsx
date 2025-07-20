import React from 'react';
import { Trophy, Star, Crown, Heart, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-16 bg-gradient-to-t from-purple-900/50 to-transparent backdrop-blur-sm border-t border-white/20">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
                <Trophy className="h-6 w-6 text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold text-white">Leaderboard</h3>
            </div>
            <p className="text-white/80 text-sm">
              Claim points and rise to the top in this exciting leaderboard system!
            </p>
          </div>
          
          {/* Quick stats */}
          <div className="text-center">
            <h4 className="text-white font-semibold mb-3">System Stats</h4>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex justify-center items-center space-x-2">
                <Star className="h-4 w-4 text-orange-400" />
                <span>Points Range: 1-10</span>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <Crown className="h-4 w-4 text-yellow-400" />
                <span>Real-time Rankings</span>
              </div>
            </div>
          </div>
          
          {/* Made with love */}
          <div className="text-center md:text-right">
            <h4 className="text-white font-semibold mb-3">Built With</h4>
            <div className="flex items-center justify-center md:justify-end space-x-2 text-sm text-white/80">
              <Code className="h-4 w-4 text-blue-400" />
              <span>React & Node.js</span>
            </div>
            <div className="flex items-center justify-center md:justify-end space-x-2 text-sm text-white/80 mt-2">
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>Made with passion</span>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2025 Leaderboard System. All rights reserved.
            </div>
            
            {/* Decorative elements */}
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Star className="h-3 w-3 text-yellow-300 animate-pulse" />
                <Star className="h-4 w-4 text-yellow-300 animate-pulse delay-300" />
                <Star className="h-3 w-3 text-yellow-300 animate-pulse delay-700" />
              </div>
              <span className="text-white/60 text-sm">Keep climbing!</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-4 left-8 w-8 h-8 bg-white rounded-full"></div>
        <div className="absolute bottom-12 right-12 w-6 h-6 bg-white rounded-full"></div>
        <div className="absolute bottom-8 left-1/3 w-4 h-4 bg-white rounded-full"></div>
      </div>
    </footer>
  );
}