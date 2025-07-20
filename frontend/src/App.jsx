import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TopThreeLeaderboard from './components/TopThreeLeaderboard';
import RemainingLeaderboard from './components/RemainingLeaderboard';
import UserSelector from './components/UserSelector';
import AddUserForm from './components/AddUserForm';
import ClaimButton from './components/ClaimButton';
import PointsDisplay from './components/PointsDisplay';
import UserHistory from './components/UserHistory';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [claimResult, setClaimResult] = useState(null);
  const [showClaimResult, setShowClaimResult] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  // Mock API base URL - replace with your actual backend URL
  const API_BASE = 'http://localhost:3000';

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/users`);
      const data = await response.json();
      setUsers(data.allUsers || []);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  // Add new user
  const handleAddUser = async () => {
    if (!username.trim()) return;
    
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim() }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('User added successfully!');
        setUsername('');
        fetchUsers(); // Refresh the list
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to add user');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Failed to add user');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Claim points
  const handleClaimPoints = async () => {
    if (!selectedUserId) return;
    
    try {
      setIsClaimLoading(true);
      setShowClaimResult(false);
      
      const response = await fetch(`${API_BASE}/claim/${selectedUserId}`, {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setClaimResult({
          randomPoints: data.randomPoints,
          totalPoints: data.totalPoints,
          username: users.find(u => u._id === selectedUserId)?.username
        });
        setShowClaimResult(true);
        fetchUsers(); // Refresh leaderboard
        if (selectedUserId) {
          fetchUserHistory(selectedUserId); // Refresh history
        }
        
        // Hide result after 5 seconds
        setTimeout(() => setShowClaimResult(false), 5000);
      } else {
        setError(data.message || 'Failed to claim points');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Failed to claim points');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsClaimLoading(false);
    }
  };

  // Fetch user history
  const fetchUserHistory = async (userId) => {
    if (!userId) return;
    
    try {
      setIsHistoryLoading(true);
      const response = await fetch(`${API_BASE}/history/${userId}`);
      const data = await response.json();
      setUserHistory(data.userClaimHistory || []);
    } catch (err) {
      console.error('Failed to fetch user history');
    } finally {
      setIsHistoryLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Load history when user is selected
  useEffect(() => {
    if (selectedUserId) {
      fetchUserHistory(selectedUserId);
    } else {
      setUserHistory([]);
    }
  }, [selectedUserId]);

  const selectedUser = users.find(user => user._id === selectedUserId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-white rounded-full"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        
        {/* User Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AddUserForm
            username={username}
            onUsernameChange={setUsername}
            onSubmit={handleAddUser}
            isLoading={isLoading}
            error={error}
            success={success}
          />
          
          <div>
            <UserSelector
              users={users}
              selectedUserId={selectedUserId}
              onUserSelect={setSelectedUserId}
              disabled={isLoading}
            />
            
            <ClaimButton
              onClaim={handleClaimPoints}
              disabled={!selectedUserId}
              isLoading={isClaimLoading}
              selectedUsername={selectedUser?.username}
            />
          </div>
        </div>

        {/* Points Display */}
        <PointsDisplay
          randomPoints={claimResult?.randomPoints}
          totalPoints={claimResult?.totalPoints}
          username={claimResult?.username}
          isVisible={showClaimResult}
        />

        {/* Leaderboard Section */}
        <div className="mb-8">
          <TopThreeLeaderboard users={users} isLoading={isLoading} />
          <RemainingLeaderboard users={users} isLoading={isLoading} />
        </div>

        {/* User History */}
        {selectedUserId && (
          <UserHistory
            history={userHistory}
            username={selectedUser?.username}
            isLoading={isHistoryLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;