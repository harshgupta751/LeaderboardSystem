import React from 'react';
import { Gift, Loader, Sparkles } from 'lucide-react';

export default function ClaimButton({ onClaim, disabled = false, isLoading = false, selectedUsername }) {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <button
        onClick={onClaim}
        disabled={disabled || isLoading}
        className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-2xl hover:shadow-3xl disabled:shadow-none flex items-center justify-center space-x-3 border-2 border-white/30 relative overflow-hidden group"
      >
        {/* Animated background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {isLoading ? (
          <>
            <Loader className="h-6 w-6 animate-spin" />
            <span className="text-lg">Claiming Points...</span>
          </>
        ) : (
          <>
            <div className="relative z-10">
              <Gift className="h-6 w-6" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-lg relative z-10">
              {selectedUsername ? `Claim for ${selectedUsername}` : 'Claim Random Points'}
            </span>
          </>
        )}
      </button>
      
      {disabled && !isLoading && (
        <p className="text-sm text-white/80 text-center mt-2 bg-white/10 rounded-lg p-2">
          Please select a user first
        </p>
      )}
    </div>
  );
}