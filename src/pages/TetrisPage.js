import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TetrisGame from '../components/TetrisGame';
import '../styles/TetrisPage.css';

export default function TetrisPage() {
  const [started, setStarted] = useState(false);

  return (
    <div className="tetris-page container">
      <h1 className="glitch-title" data-text="TETRIS">TETRIS</h1>

      {!started && (
        <>
          <section className="instructions">
            <h2>玩法说明</h2>
            <ul>
              <li>← →：移动方块</li>
              <li>↑：旋转方块</li>
              <li>↓：加速下落</li>
              <li>空格：硬降</li>
            </ul>
          </section>
          <button className="btn btn-primary" onClick={() => setStarted(true)}>
            开始游戏
          </button>
          <div style={{ marginTop: '16px' }}>
            <Link to="/" className="btn btn-secondary">返回首页</Link>
          </div>
        </>
      )}

      {started && (
        <>
          <TetrisGame />
          <button className="btn btn-secondary" onClick={() => setStarted(false)}>
            退出游戏
          </button>
        </>
      )}
    </div>
  );
}
