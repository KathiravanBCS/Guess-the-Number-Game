import React, { useEffect, useState } from "react";
import "../Style/GuessTheNumber.css"; // Import CSS for styling

export const GuessTheNumber = () => {
  // State for random number, user input, message, remaining time, and game status
  const [randomNumber, setRandomNumber] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [userNumber, setUserNumber] = useState("");
  const [message, setMessage] = useState("Welcome! Guess a number between 1 and 10");
  const [remainingTime, setRemainingTime] = useState(30);
  const [gameover, setGameover] = useState(false);

  // Function to handle user's guess
  const handleGuess = () => {
    if (parseInt(userNumber) === randomNumber) {
      setMessage("Correct! You guessed the Number.");
      setGameover(true);
    } else if (parseInt(userNumber) > randomNumber) {
      setMessage("Too high! Try again.");
    } else {
      setMessage("Too low! Try again.");
    }
    setUserNumber(""); // Reset input after guess
  };

  // Countdown timer effect
  useEffect(() => {
    if (gameover) return;

    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setMessage(`Game over! Time's up! The Number was ${randomNumber}`);
      setGameover(true);
    }
  }, [remainingTime, gameover]);

  // Function to restart the game
  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 10) + 1);
    setUserNumber("");
    setMessage("Welcome! Guess a number between 1 and 10");
    setRemainingTime(30);
    setGameover(false);
  };

  return (
    <div className="game-container">
      <h2 className="game-title">Guess the Number Game</h2>

      {/* Display game message with dynamic styling */}
      <p className={`game-message${gameover ? (parseInt(userNumber) === randomNumber ? " success" : " failure") : " info"}`}>
        {message}
      </p>

      {/* Input and button for guessing (only if game is not over) */}
      {!gameover && (
        <div>
          <input
            type="number"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
            className="game-input"
            disabled={gameover}
          />
          <button className="game-button" onClick={handleGuess} disabled={gameover}>
            Guess
          </button>
        </div>
      )}

      {/* Display remaining time */}
      <div className="game-status">
        <p>Time Left: {remainingTime} seconds</p>
      </div>

      {/* Reset button (Only appears when the game is over) */}
      {gameover && <button className="game-button" onClick={resetGame}>Restart Game</button>}
    </div>
  );
};
