import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import Header from './components/Header';
import TopThreeLeaderboard from './components/TopThreeLeaderboard';
import RemainingLeaderboard from './components/RemainingLeaderboard';
import UserSelector from './components/UserSelector';
import AddUserForm from './components/AddUserForm';
import ClaimButton from './components/ClaimButton';
import PointsDisplay from './components/PointsDisplay';
import UserHistory from './components/UserHistory';
import Footer from './components/Footer';
import axiosInstance from './api/axiosInstance';

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


  // Fetch all users
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/users');
      setUsers(response.data.allUsers || []);
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
      
      const response = await axiosInstance.post('/users',{ username: username.trim() })
      if(response.data.message==="User added successfully!"){
        setSuccess(response.data.message);
        setUsername('');
        fetchUsers();   // Refresh the list
        setTimeout(() => setSuccess(''), 3000);
      }
     else if(response.data.message==="Username already exists!"){
          setError(response.data.message);
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
      
      const response = await axiosInstance.post(`/claim/${selectedUserId}`)
      
        setClaimResult({
          randomPoints: response.data.randomPoints,
          totalPoints: response.data.totalPoints,
          username: users.find(u => u._id === selectedUserId)?.username
        });
        setShowClaimResult(true);
        fetchUsers(); // Refresh leaderboard
        if (selectedUserId) {
          fetchUserHistory(selectedUserId); // Refresh history
        }
        
        // Hide result after 5 seconds
        setTimeout(() => setShowClaimResult(false), 5000);
  
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
      const response = await axiosInstance.get(`/history/${userId}`)
      setUserHistory(response.data.userClaimHistory || []);
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Add User Form */}
          <AddUserForm
            username={username}
            onUsernameChange={setUsername}
            onSubmit={handleAddUser}
            isLoading={isLoading}
            error={error}
            success={success}
          />
          
          {/* User Selection and Claim */}
          <div className="space-y-4">
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
            
            {/* Points Display */}
            <PointsDisplay
              randomPoints={claimResult?.randomPoints}
              totalPoints={claimResult?.totalPoints}
              username={claimResult?.username}
              isVisible={showClaimResult}
            />
          </div>
          
          {/* User History */}
          <div className="xl:col-span-1">
            {selectedUserId ? (
              <UserHistory
                history={userHistory}
                username={selectedUser?.username}
                isLoading={isHistoryLoading}
              />
            ) : (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <User className="h-8 w-8 text-gray-400 mx-auto" />
                  </div>
                  <p className="text-gray-500 text-lg">Select a user</p>
                  <p className="text-gray-400 text-sm">to view claim history</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="mb-8">
          <TopThreeLeaderboard users={users} isLoading={isLoading} />
          <RemainingLeaderboard users={users} isLoading={isLoading} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;