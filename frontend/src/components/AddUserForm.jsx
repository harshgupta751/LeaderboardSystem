import React from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';

export default function AddUserForm({ 
  username, 
  onUsernameChange, 
  onSubmit, 
  isLoading = false, 
  error, 
  success 
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
        <div className="flex items-center space-x-2 mb-4">
          <UserPlus className="h-6 w-6 text-purple-500" />
          <h2 className="text-lg font-semibold text-gray-900">Add New User</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              placeholder="Enter username..."
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105 disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Add User</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 flex items-center space-x-2 text-sm text-red-600 bg-red-50 rounded-xl p-3 border border-red-200">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-4 flex items-center space-x-2 text-sm text-green-600 bg-green-50 rounded-xl p-3 border border-green-200">
            <UserPlus className="h-4 w-4" />
            <span>{success}</span>
          </div>
        )}
      </div>
    </div>
  );
}