import React from 'react';
import { Star, User } from 'lucide-react';

export default function RemainingLeaderboard({ users, isLoading = false }) {
  const remainingUsers = users.slice(3);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse flex items-center space-x-4 p-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="w-16 h-6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (remainingUsers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No more users to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
        <h3 className="text-white font-semibold text-lg text-center">Other Rankings</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {remainingUsers.map((user, index) => {
          const rank = index + 4;
          
          return (
            <div key={user._id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md rounded-lg">
              {/* Rank */}
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                <span className="text-gray-600 font-semibold text-sm">{rank}</span>
              </div>
              
              {/* Profile */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200">
                <span className="text-white font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-800 font-medium truncate">{user.username}</h4>
                <p className="text-gray-500 text-sm">Rank #{rank}</p>
              </div>
              
              {/* Points */}
              <div className="flex items-center space-x-1 bg-orange-50 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors duration-200">
                <Star className="w-4 h-4 text-orange-400 hover:animate-spin" />
                <span className="text-orange-600 font-semibold">
                  {user.totalPoints.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}