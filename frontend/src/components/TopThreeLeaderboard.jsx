import React from 'react';
import { Crown, Star, Trophy } from 'lucide-react';

export default function TopThreeLeaderboard({ users, isLoading = false }) {
  const topThree = users.slice(0, 3);
  
  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return {
          crown: 'text-yellow-400',
          border: 'border-yellow-400',
          bg: 'bg-gradient-to-b from-yellow-100 to-yellow-200',
          badge: 'bg-gradient-to-r from-yellow-400 to-yellow-500'
        };
      case 2:
        return {
          crown: 'text-gray-400',
          border: 'border-gray-400',
          bg: 'bg-gradient-to-b from-gray-100 to-gray-200',
          badge: 'bg-gradient-to-r from-gray-400 to-gray-500'
        };
      case 3:
        return {
          crown: 'text-amber-600',
          border: 'border-amber-600',
          bg: 'bg-gradient-to-b from-amber-100 to-amber-200',
          badge: 'bg-gradient-to-r from-amber-500 to-amber-600'
        };
      default:
        return {
          crown: 'text-gray-400',
          border: 'border-gray-300',
          bg: 'bg-white',
          badge: 'bg-gray-400'
        };
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((rank) => (
          <div key={rank} className="animate-pulse">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {topThree.map((user, index) => {
        const rank = index + 1;
        const styles = getRankStyle(rank);
        
        return (
          <div key={user._id} className="relative">
            {/* Crown for rank 1 */}
            {rank === 1 && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Crown className={`w-8 h-8 ${styles.crown} drop-shadow-lg`} />
              </div>
            )}
            
            {/* Rank badge */}
            <div className={`absolute -top-2 -right-2 w-8 h-8 ${styles.badge} rounded-full flex items-center justify-center z-10 shadow-lg`}>
              <span className="text-white font-bold text-sm">{rank}</span>
            </div>
            
            {/* Card */}
            <div className={`${styles.bg} ${styles.border} border-2 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
              {/* Profile Image */}
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200">
                  <span className="text-white font-bold text-xl">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                {rank <= 3 && (
                  <div className="absolute -bottom-1 -right-1">
                    <Trophy className={`w-6 h-6 ${styles.crown}`} />
                  </div>
                )}
              </div>
              
              {/* Username */}
              <h3 className="text-gray-800 font-semibold text-center mb-2 truncate">
                {user.username}
              </h3>
              
              {/* Points */}
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="text-lg font-bold text-gray-700">
                  {user.totalPoints.toLocaleString()}
                </span>
              </div>
              
              {/* Subtle glow effect for top 3 */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}