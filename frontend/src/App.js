// src/App.js
import React, { useState } from 'react';
import './App.css';
import SlotMachine from './SlotMachine';
import Roulette from './Roulette';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(1000); // User's balance
  const [adWatchCount, setAdWatchCount] = useState(0); // Track how many ads the user has watched
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Control the popup visibility

  const handleLogin = () => {
    if (username.trim() !== '') {
      setLoggedIn(true);
    } else {
      alert('Please enter a username');
    }
  };

  const openPopup = () => {
    if (adWatchCount >= 3) {
      alert('You have already watched the maximum number of ads (3).');
      return;
    }
    setIsPopupOpen(true); // Open the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const watchAdForBonus = () => {
    closePopup(); // Close the popup after confirming
    alert('Please wait while the ad plays...');
    setTimeout(() => {
      setBalance(balance + 50); // Add $50 to the user's balance
      setAdWatchCount(adWatchCount + 1); // Increment the ad watch count
      alert('You earned $50 bonus!');
    }, 3000); // Simulate a 3-second ad
  };

  return (
    <div className="App">
      <h1>Welcome to My Gambling Website</h1>

      {/* Shop Section Moved to Top-Right */}
      {loggedIn && (
        <div className="shop-top">
          <button onClick={openPopup}>Watch Ad</button>
        </div>
      )}

      {!loggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Hello, {username}!</h2>
          <h3>Balance: ${balance}</h3>
          <button onClick={() => setLoggedIn(false)}>Logout</button>

          <hr />
          <SlotMachine balance={balance} setBalance={setBalance} />
          <hr />
          <Roulette balance={balance} setBalance={setBalance} />
        </div>
      )}

      {/* Popup for Watching Ads */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Watch an Ad</h3>
            <p>Watch an ad to earn an extra $50!</p>
            <button onClick={watchAdForBonus}>Confirm</button>
            <button onClick={closePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;