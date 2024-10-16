import React, { useState } from 'react';

const initialDice = [0, 0, 0, 0, 0, 0];

const calculateScore = (keptDice: number[]): number => {
  let points = 0;
  const counts = Array(7).fill(0);
  keptDice.forEach((die) => {
    counts[die]++;
  });

  if(counts[1] === 1){
    points += 100;
  }
  if(counts[5] === 1){
    points += 50;
  }

  // Scoring rules: triplets and single 1s/5s.
  for (let i = 1; i <= 7; i++) {
    if (counts[i] < 3) {
      continue;
    }else if (counts[i] === 3) {
      points += i === 1 ? 1000 : i * 100;
    }else if (counts[i] === 4) {
      points += i === 1 ? 2000 : i * 200;  
    }else if (counts[i] === 5) {
      points += i === 1 ? 4000 : i  * 400;
    }else if (counts[i] === 6) {
      points += i === 1 ? 8000 : i * 800;
    }
  }

  // points += counts[1] * 100;
  // points += counts[5] * 50;

  return points;
};

const Home: React.FC = () => {
  const [dice, setDice] = useState<number[]>(initialDice);
  const [keptDice, setKeptDice] = useState<boolean[]>([false, false, false, false, false, false]);
  const [turnScore, setTurnScore] = useState<number>(0);
  const [playerScores, setPlayerScores] = useState<number[]>([0, 0]);
  const [currentTurn, setCurrentTurn] = useState<number>(0); // 0 for player 1, 1 for player 2
  const [gameOver, setGameOver] = useState<boolean>(false);

  const rollDice = () => {
    const newDice = dice.map((die, index) => 
      !keptDice[index] ? Math.ceil(Math.random() * 6) : die
    );
    setDice(newDice);
  };

  const keepDice = (index: number) => {
    if (dice[index] === 0 || keptDice[index]) return;

    const newKeptDice = [...keptDice];
    newKeptDice[index] = true;
    setKeptDice(newKeptDice);

    const keptValues = dice.filter((_, i) => newKeptDice[i]);
    const newScore = calculateScore(keptValues);

    setTurnScore(newScore);
  };

  const endTurn = () => {
    const newScores = [...playerScores];
    newScores[currentTurn] += turnScore;

    setPlayerScores(newScores);
    setTurnScore(0);
    setKeptDice([false, false, false, false, false, false]);
    setDice(initialDice);

    if (newScores[currentTurn] >= 5000) {
      setGameOver(true);
    } else {
      setCurrentTurn((currentTurn + 1) % 2); // Switch turn
    }
  };

  const resetGame = () => {
    setPlayerScores([0, 0]);
    setCurrentTurn(0);
    setTurnScore(0);
    setDice(initialDice);
    setKeptDice([false, false, false, false, false, false]);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Medieval Dice Game</h1>
      {gameOver ? (
        <div>
          <h2>🏰 Player {currentTurn + 1} wins the kingdom! 🏰</h2>
          <button onClick={resetGame} className="medieval-button">Restart Quest</button>
        </div>
      ) : (
        <div>
          <h2>⚔️ Player {currentTurn + 1}'s Turn ⚔️</h2>
          <p>Turn Score: {turnScore}</p>
          <p>Player 1 Score: {playerScores[0]}</p>
          <p>Player 2 Score: {playerScores[1]}</p>
          <div className="dice-container">
            {dice.map((die, index) => (
              <button 
                key={index} 
                onClick={() => keepDice(index)} 
                disabled={keptDice[index]} 
                className={`dice ${keptDice[index] ? 'kept' : ''}`}
              >
                {keptDice[index] ? `Kept: ${dice[index]}` : `Die ${index + 1}: ${die}`}
              </button>
            ))}
          </div>
          <button 
            onClick={rollDice} 
            disabled={dice.every((index) => keptDice[index])} 
            className="medieval-button"
          >
            Roll the Dice 🎲
          </button>
          <button onClick={endTurn} disabled={turnScore === 0} className="medieval-button">
            End Turn 🛡️
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
