import React, { useState, useEffect } from 'react';
import GameScene from './components/GameScene';
import './index.css';

export default function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let interval;
    if (!gameOver) {
      interval = setInterval(() => {
        setScore(s => s + 10);
      }, 100); // Increase score rapidly as player survives
    }
    return () => clearInterval(interval);
  }, [gameOver]);

  const handleGameOver = () => {
    setGameOver(true);
  };

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
  };

  return (
    <>
      <GameScene gameOver={gameOver} onGameOver={handleGameOver} />
      
      <div className="ui-overlay">
        <div className="score-display">Score: {score}</div>
        
        {gameOver && (
          <div className="game-over-screen">
            <div className="game-over-text">GAME OVER</div>
            <p style={{color: 'white', marginBottom: '2rem', fontSize: '1.5rem'}}>Final Score: {score}</p>
            <button className="restart-btn" onClick={restartGame}>Restart Game</button>
          </div>
        )}
      </div>
    </>
  );
}
