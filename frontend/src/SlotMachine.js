import React, { useState, useRef } from 'react';

const SlotMachine = ({ balance, setBalance }) => {
  const [result, setResult] = useState(['🍒', '🍋', '🍇']); // Default symbols
  const [spinning, setSpinning] = useState(false);
  const spinSound = useRef(new Audio('/sounds/spin.mp3')); // Path to spin sound
  const winSound = useRef(new Audio('/sounds/win.mp3'));   // Path to win sound

  const spin = () => {
    if (balance < 10) {
      alert('Insufficient balance to spin!');
      return;
    }

    spinSound.current.play(); // Play spin sound
    setSpinning(true);
    setBalance(balance - 10); // Deduct 10 from balance for each spin

    setTimeout(() => {
      const symbols = ['🍒', '🍋', '🍇', '🍉'];
      const spinResult = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];

      setResult(spinResult);

      // Check for winning combination
      if (spinResult[0] === spinResult[1] && spinResult[1] === spinResult[2]) {
        const winnings = 50; // Example: Win 50 if all symbols match
        setBalance(balance + winnings);
        winSound.current.play(); // Play win sound
        alert(`You won $${winnings}!`);
      }

      setSpinning(false);
    }, 1000); // Simulate spinning for 1 second
  };

  return (
    <div>
      <h2>Slot Machine</h2>
      <div style={{ fontSize: '2rem', margin: '20px' }}>
        {spinning ? 'Spinning...' : result.join(' ')}
      </div>
      <button onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin ($10)'}
      </button>
    </div>
  );
};

export default SlotMachine;