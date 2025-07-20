import React from 'react';
import { History, Calendar, Star, Clock } from 'lucide-react';

export default function UserHistory({ history, username, isLoading = false }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <History className="h-6 w-6 text-purple-500" />
          <span>Claim History</span>
        </h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse flex items-center space-x-3 p-3 bg-gray-100 rounded-xl">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <History className="h-6 w-6 text-purple-500" />
        <span>Claim History</span>
        {username && <span className="text-purple-600">- {username}</span>}
      </h3>
      
      {history.length === 0 ? (
        <div className="text-center py-8">
          <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
            <Clock className="h-8 w-8 text-gray-400 mx-auto" />
          </div>
          <p className="text-gray-500 text-lg">No claim history found</p>
          <p className="text-gray-400 text-sm">Start claiming points to see history!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {history.map((claim, index) => (
            <div
              key={claim._id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all duration-200 border border-purple-100"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-md">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    +{claim.points} points
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(claim.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-lg">
                #{history.length - index}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
            <span className="font-medium">Total Claims: {history.length}</span>
            <span className="font-medium">Total Points: {history.reduce((sum, claim) => sum + claim.points, 0)}</span>
          </div>
        </div>
      )}
    </div>
  );
}