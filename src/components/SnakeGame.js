import React, { useEffect, useRef, useState, useCallback } from 'react';
import './SnakeGame.css';

const COLS = 20;
const ROWS = 20;
const CELL_SIZE = 20; // px

const DIRECTIONS = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

function isOccupied(snake, row, col) {
  return snake.some(([r, c]) => r === row && c === col);
}

function getRandomFood(snake) {
  let row, col;
  do {
    row = Math.floor(Math.random() * ROWS);
    col = Math.floor(Math.random() * COLS);
  } while (isOccupied(snake, row, col));
  return [row, col];
}

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([[Math.floor(ROWS / 2), Math.floor(COLS / 2)]]);
  const [direction, setDirection] = useState([0, 1]);
  const [food, setFood] = useState(getRandomFood([[Math.floor(ROWS / 2), Math.floor(COLS / 2)]]));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, COLS * CELL_SIZE, ROWS * CELL_SIZE);

    // Draw food
    ctx.fillStyle = '#f00';
    ctx.fillRect(food[1] * CELL_SIZE, food[0] * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);

    // Draw snake
    ctx.fillStyle = '#0f0';
    snake.forEach(([r, c]) => {
      ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });
  }, [snake, food]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];

        // Collision with walls or self
        if (
          newHead[0] < 0 ||
          newHead[0] >= ROWS ||
          newHead[1] < 0 ||
          newHead[1] >= COLS ||
          prev.some(([r, c]) => r === newHead[0] && c === newHead[1])
        ) {
          setGameOver(true);
          return prev;
        }

        let newSnake = [newHead, ...prev];
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          // ate food
          setFood(getRandomFood(newSnake));
          setScore((s) => s + 10);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  // Keyboard controls
  const handleKey = useCallback(
    (e) => {
      const newDir = DIRECTIONS[e.key];
      if (!newDir) return;
      // prevent reversing directly
      if (snake.length > 1) {
        const [dr, dc] = newDir;
        if (dr === -direction[0] && dc === -direction[1]) return;
      }
      setDirection(newDir);
    },
    [direction, snake]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const handleRestart = () => {
    const initial = [[Math.floor(ROWS / 2), Math.floor(COLS / 2)]];
    setSnake(initial);
    setDirection([0, 1]);
    setFood(getRandomFood(initial));
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="snake-container">
      <canvas ref={canvasRef} width={COLS * CELL_SIZE} height={ROWS * CELL_SIZE} />
      <div className="snake-info">
        <p>Score: {score}</p>
        {gameOver && (
          <button className="btn btn-primary" onClick={handleRestart}>
            Game Over - Retry
          </button>
        )}
      </div>
    </div>
  );
}
