import React, { useEffect, useRef, useState, useCallback } from 'react';
import './TetrisGame.css';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 24; // px

// Tetromino shapes (row, col coordinate pairs for BLOCK_SIZE grid)
const TETROMINOS = {
  I: { color: '#00f0f0', blocks: [[0, -1], [0, 0], [0, 1], [0, 2]] },
  J: { color: '#0000f0', blocks: [[-1, -1], [0, -1], [0, 0], [0, 1]] },
  L: { color: '#f0a000', blocks: [[-1, 1], [0, -1], [0, 0], [0, 1]] },
  O: { color: '#f0f000', blocks: [[0, 0], [0, 1], [-1, 0], [-1, 1]] },
  S: { color: '#00f000', blocks: [[-1, 0], [-1, 1], [0, -1], [0, 0]] },
  T: { color: '#a000f0', blocks: [[-1, 0], [0, -1], [0, 0], [0, 1]] },
  Z: { color: '#f00000', blocks: [[-1, -1], [-1, 0], [0, 0], [0, 1]] },
};
const TYPES = Object.keys(TETROMINOS);

function getRandomTetromino() {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  return { ...TETROMINOS[type], row: 1, col: Math.floor(COLS / 2) };
}

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

export default function TetrisGame() {
  const canvasRef = useRef(null);
  const [board, setBoard] = useState(createBoard);
  const [current, setCurrent] = useState(getRandomTetromino);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Draw board and tetromino
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawCell = (row, col, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(
        col * BLOCK_SIZE,
        row * BLOCK_SIZE,
        BLOCK_SIZE - 1,
        BLOCK_SIZE - 1
      );
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw placed blocks
    board.forEach((r, rowIdx) => {
      r.forEach((cell, colIdx) => {
        if (cell) drawCell(rowIdx, colIdx, cell);
      });
    });

    // Draw current tetromino
    if (current) {
      current.blocks.forEach(([r, c]) => {
        const row = current.row + r;
        const col = current.col + c;
        drawCell(row, col, current.color);
      });
    }
  }, [board, current]);

  // Collision detection helper
  const hasCollision = useCallback((tetro, nextRow, nextCol) => {
    return tetro.blocks.some(([r, c]) => {
      const row = nextRow + r;
      const col = nextCol + c;
      return (
        row < 0 ||
        row >= ROWS ||
        col < 0 ||
        col >= COLS ||
        board[row][col]
      );
    });
  }, [board]);

  // Lock tetromino into board and clear lines
  const mergeAndSweep = useCallback((tetro) => {
    const newBoard = board.map((row) => [...row]);
    tetro.blocks.forEach(([r, c]) => {
      const row = tetro.row + r;
      const col = tetro.col + c;
      if (row >= 0) newBoard[row][col] = tetro.color;
    });

    // Clear full rows
    let cleared = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row].every(Boolean)) {
        newBoard.splice(row, 1);
        newBoard.unshift(Array(COLS).fill(null));
        cleared += 1;
        row++; // stay on same row index after unshift
      }
    }
    if (cleared) setScore((s) => s + cleared * 100);
    setBoard(newBoard);
  }, [board]);

  // Move tetromino down periodically
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (!prev) return prev;
        if (hasCollision(prev, prev.row + 1, prev.col)) {
          // lock piece
          mergeAndSweep(prev);
          const next = getRandomTetromino();
          if (hasCollision(next, next.row, next.col)) {
            setGameOver(true);
            return null;
          }
          return next;
        }
        return { ...prev, row: prev.row + 1 };
      });
    }, 500);
    return () => clearInterval(interval);
  }, [board, gameOver, hasCollision, mergeAndSweep]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver || !current) return;
      if (e.key === 'ArrowLeft') {
        if (!hasCollision(current, current.row, current.col - 1))
          setCurrent({ ...current, col: current.col - 1 });
      } else if (e.key === 'ArrowRight') {
        if (!hasCollision(current, current.row, current.col + 1))
          setCurrent({ ...current, col: current.col + 1 });
      } else if (e.key === 'ArrowDown') {
        if (!hasCollision(current, current.row + 1, current.col))
          setCurrent({ ...current, row: current.row + 1 });
      } else if (e.key === 'ArrowUp') {
        // rotate 90 deg clockwise (simple transpose)
        const rotated = current.blocks.map(([r, c]) => [-c, r]);
        if (!hasCollision({ ...current, blocks: rotated }, current.row, current.col))
          setCurrent({ ...current, blocks: rotated });
      } else if (e.key === ' ') {
        // hard drop
        let dropRow = current.row;
        while (!hasCollision(current, dropRow + 1, current.col)) {
          dropRow += 1;
        }
        setCurrent({ ...current, row: dropRow });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, gameOver, hasCollision]);

  const handleRestart = () => {
    setBoard(createBoard());
    setCurrent(getRandomTetromino());
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="tetris-container">
      <canvas
        ref={canvasRef}
        width={COLS * BLOCK_SIZE}
        height={ROWS * BLOCK_SIZE}
      />
      <div className="tetris-info">
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
