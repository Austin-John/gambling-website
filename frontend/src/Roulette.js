import React, { useState, useRef } from 'react';

const Roulette = ({ balance, setBalance }) => {
  const [result, setResult] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState(''); // User's bet (Red, Black, Green)
  const [betAmount, setBetAmount] = useState(0);
  const spinSound = useRef(new Audio('/sounds/spin.mp3')); // Path to spin sound
  const winSound = useRef(new Audio('/sounds/win.mp3'));   // Path to win sound

  const spin = () => {
    if (betAmount <= 0 || betAmount > balance) {
      alert('Please enter a valid bet amount.');
      return;
    }

    spinSound.current.play(); // Play spin sound
    setSpinning(true);
    setBalance(balance - betAmount); // Deduct bet amount from balance

    setTimeout(() => {
      const outcomes = ['Red', 'Black', 'Green'];
      const spinResult = outcomes[Math.floor(Math.random() * outcomes.length)];
      setResult(spinResult);

      // Check if the user won
      if (spinResult === bet) {
        let winnings = betAmount * (bet === 'Green' ? 14 : 2); // Higher payout for Green
        setBalance(balance + winnings);
        winSound.current.play(); // Play win sound
        alert(`You won $${winnings}!`);
      } else {
        alert('You lost this round.');
      }

      setSpinning(false);
    }, 1000); // Simulate spinning for 1 second
  };

  return (
    <div className="roulette-container">
      <h2>Roulette</h2>

      {/* Roulette Board */}
      <div className="roulette-board">
        <div className="roulette-option red" onClick={() => setBet('Red')}>
          Red
        </div>
        <div className="roulette-option black" onClick={() => setBet('Black')}>
          Black
        </div>
        <div className="roulette-option green" onClick={() => setBet('Green')}>
          Green
        </div>
      </div>

      {/* Selected Bet */}
      <div className="selected-bet">
        <p>Bet on: <strong>{bet || 'None'}</strong></p>
      </div>

      {/* Bet Amount Input */}
      <div className="bet-input">
        <label>
          Bet Amount ($):
          <input
            type="number"
            placeholder="Enter bet amount"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
          />
        </label>
      </div>

      {/* Spin Button */}
      <button onClick={spin} disabled={spinning || !bet || betAmount <= 0}>
        {spinning ? 'Spinning...' : 'Spin'}
      </button>

      {/* Result */}
      <div className="roulette-result">
        {spinning ? 'Spinning...' : result && <p>Result: <strong>{result}</strong></p>}
      </div>
    </div>
  );
};

export default Roulette;