import React from 'react';
import { ChevronDown, User } from 'lucide-react';

export default function UserSelector({ users, selectedUserId, onUserSelect, disabled = false }) {
  const selectedUser = users.find(user => user._id === selectedUserId);

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <label htmlFor="user-select" className="block text-sm font-medium text-white mb-2">
        Select User to Award Points
      </label>
      <div className="relative">
        <select
          id="user-select"
          value={selectedUserId}
          onChange={(e) => onUserSelect(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          <option value="">Choose a user...</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username} ({user.totalPoints} points)
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-600" />
        </div>
      </div>
      
      {selectedUser && (
        <div className="mt-3 flex items-center space-x-2 text-sm text-white bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
          <User className="h-4 w-4 text-yellow-400" />
          <span>Selected: <strong>{selectedUser.username}</strong> with {selectedUser.totalPoints} points</span>
        </div>
      )}
    </div>
  );
}